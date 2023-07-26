# fipy
Fipy is a simple package to help you copy files from one directory to another.

# Example
```typescript
import { FileCopy } from 'fipy';

const fipy = new FileCopy({
	source: 'my/source/folder',
	destination: 'my/destination/folder',
	fileGlob: /.*\.txt/,
	recursive: true,
	folderGlob: /.*/,
	overwrite: false,
	createDestinationFolder: true
});

fipy.on('fileCopied', (file, destinationFile) => {
	console.log(`Copied ${file} to ${destinationFile}`);
});

fipy.copyFiles();
```

# API
## Settings
The settings object is used to configure the file copy process. It has the following properties:

### source
The source folder to copy files from. This is a required property.  
Type: `string`

### destination
The destination folder to copy files to. This is a required property.  
Type: `string`

### fileGlob
The glob pattern to match files to copy. This is a required property.  
Type: `RegExp`

### recursive
Whether to copy files recursively. This is an optional property.  
Type: `boolean`

### folderGlob
The glob pattern to match folders to copy. Only used if recursive is true. This is an optional property.  
Type: `RegExp`

### overwrite
Whether to overwrite existing files. This is an optional property.  
Type: `boolean`

### createDestinationFolder
Whether to create the destination folder if it doesn't exist. Also creates subfolders if recursive is true. This is an optional property.  
Type: `boolean`

## copyFiles
Copies files from one directory to another.

## on
Adds an event listener to the file copy process.  
Parameters:
- `event`: Must be `fileCopied`
- `callback`: The callback function to call when the event is fired. The callback function has the following parameters:
  - `file`: The file that was copied. Type: `string`
  - `destinationFile`: The destination file. Type: `string`
