import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'node:events';

import { FileCopySettings } from './fipy.settings';

export class FileCopy extends EventEmitter {
	constructor(private settings: FileCopySettings) {
		super();
	}

	/**
	 * Copies files from the source folder to the destination folder. Emits a fileCopied event for each file copied.
	 * @throws {Error} Emits an error event if the source folder does not exist.
	 */
	public copyFiles(renameFunction?: (file: string) => string): void {
		// Check if source folder exists
		if (!fs.existsSync(this.settings.source)) {
			// throw new Error(`Source folder does not exist: ${this.settings.source}`);
			this.emit('error', `Source folder does not exist: ${this.settings.source}`);
		}

		// Check if destination folder exists
		if (!fs.existsSync(this.settings.destination)) {
			// Create destination folder if createDestinationFolder is true
			if (this.settings.createDestinationFolder) {
				fs.mkdirSync(this.settings.destination, { recursive: true });
			} else {
				// throw new Error(`Destination folder does not exist: ${this.settings.destination}`);
				this.emit('error', `Destination folder does not exist: ${this.settings.destination}`);
			}
		}

		// Get files to copy
		const files = this.getFilesToCopy();

		// Copy files
		for (const file of files) {
			this.copyFile(file, renameFunction);
		}
	}

	private copyFile(file: string, renameFunction?: (file: string) => string): void {
		// If createDestinationFolder, create subfolders, else just use the destination folder
		const basename = path.basename(file);
		const destinationFolder = this.settings.createDestinationFolder ? path.join(this.settings.destination, path.dirname(path.relative(this.settings.source, file))) : this.settings.destination;
		const destinationFile = path.join(destinationFolder, renameFunction ? renameFunction(basename) : basename);

		// Get folder of destination file
		const destinationFileFolder = path.dirname(destinationFile);

		// Create destination folder if createDestinationFolder is true and if it doesn't exist
		if (this.settings.createDestinationFolder && !fs.existsSync(destinationFileFolder)) {
			fs.mkdirSync(destinationFileFolder, { recursive: true });
		}

		// Copy file
		fs.copyFileSync(file, destinationFile, this.settings.overwrite ? undefined : fs.constants.COPYFILE_EXCL);

		// Emit event
		this.emit('fileCopied', file, destinationFile);
	}

	private getFilesToCopy(): string[] {
		// Create array to store files
		const files: string[] = [];

		// If recursive, get files recursively, else get top level files
		if (this.settings.recursive) {
			this.getFilesRecursive(this.settings.source, files);
		} else {
			this.getFiles(this.settings.source, files);
		}

		return files;
	}

	private getFilesRecursive(folder: string, files: string[]): void {
		const folderContents = fs.readdirSync(folder);

		folderContents.forEach((item) => {
			const itemPath = path.join(folder, item);
			const itemStat = fs.statSync(itemPath);

			if (itemStat.isDirectory()) {
				if (this.settings.folderGlob && !item.match(this.settings.folderGlob)) {
					return;
				}

				this.getFilesRecursive(itemPath, files);
			} else {
				if (this.settings.fileGlob && !item.match(this.settings.fileGlob)) {
					return;
				}

				files.push(itemPath);
			}
		});
	}

	private getFiles(folder: string, files: string[]): void {
		const folderContents = fs.readdirSync(folder);

		folderContents.forEach((item) => {
			const itemPath = path.join(folder, item);
			const itemStat = fs.statSync(itemPath);

			if (itemStat.isDirectory()) {
				return;
			}

			if (this.settings.fileGlob && !item.match(this.settings.fileGlob)) {
				return;
			}

			files.push(itemPath);
		});
	}

	/**
	 * Adds a listener for the fileCopied or error event.
	 * @param event The event to listen for. Supported events are 'fileCopied' and 'error'.
	 * @param listener The callback function to call when the event is emitted. The callback function takes two arguments: file and destinationFile.
	 * @returns This instance of FileCopy.
	 */
	public override on(event: 'fileCopied' | 'error', listener: (...args: unknown[]) => void): this {
		return super.on(event, listener);
	}
}