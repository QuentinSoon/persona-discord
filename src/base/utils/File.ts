import fs from 'fs';

export const getFiles = (directory: string, foldersOnly = false) => {
	let filesNames: string[] = [];
	const files = fs.readdirSync(directory, { withFileTypes: true });
};
