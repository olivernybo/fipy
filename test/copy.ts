import { FileCopy } from '../src/fipy';

const fileCopy = new FileCopy({
	source: './test/source',
	destination: './test/destination',
	fileGlob: /.*/,
	overwrite: true,
});

fileCopy.on('fileCopied', (file, destinationFile) => {
	console.log(`Copied ${file} to ${destinationFile}`);
});

fileCopy.on('error', (error) => {
	console.error(error);
});

fileCopy.copyFiles();