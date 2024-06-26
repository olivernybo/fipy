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
Parameters: optional rename function.  
The rename function is called for each file that is copied. It has the following parameters:  
\- `file`: The filename that is being copied. Type: `string`  
It must return a string with the new filename.

Emits the following events:
- `fileCopied`: Emitted when a file is copied. Parameters: `file` and `destinationFile`
- `error`: Emitted when an error occurs. Parameters: `errorMessage`

## moveFiles
Moves files from one directory to another.  
Parameters: optional rename function.  
The rename function is called for each file that is moved. It has the following parameters:  
\- `file`: The filename that is being moved. Type: `string`  
It must return a string with the new filename.

Emits the following events:
- `fileCopied`: Emitted when a file is moved. Parameters: `file` and `destinationFile`
- `fileDeleted`: Emitted when a file is deleted. Parameters: `file`
- `error`: Emitted when an error occurs. Parameters: `errorMessage`

## on
Adds an event listener.  
Available events:
- `fileCopied`: Emitted when a file is copied. Parameters: `file` and `destinationFile`
- `fileDeleted`: Emitted when a file is deleted. Parameters: `file`
- `error`: Emitted when an error occurs. Parameters: `errorMessage`