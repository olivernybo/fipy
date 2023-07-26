export interface FileCopySettings {
	/**
	 * The source folder to copy files from.
	 */
	source: string;

	/**
	 * The destination folder to copy files to.
	 */
	destination: string;

	/**
	 * The glob pattern to match files to copy.
	 */
	fileGlob: RegExp;

	/**
	 * Whether to copy files recursively.
	 */
	recursive?: boolean;

	/**
	 * The glob pattern to match folders to copy. Only used if recursive is true.
	 */
	folderGlob?: RegExp;

	/**
	 * Whether to overwrite existing files.
	 */
	overwrite?: boolean;

	/**
	 * Whether to create the destination folder if it doesn't exist. Also creates subfolders if recursive is true.
	 */
	createDestinationFolder?: boolean;
}