import fs from 'fs';
import path from 'path';

export const loadFiles = async (dir: string): Promise<string[]> => {
	const getTsFiles = async (
		dir: string,
		fileList: string[] = []
	): Promise<string[]> => {
		const files = await fs.promises.readdir(dir);

		for (const file of files) {
			const filePath = path.join(dir, file);
			const stat = await fs.promises.stat(filePath);

			if (stat.isDirectory()) {
				await getTsFiles(filePath, fileList);
			} else if (file.endsWith('.ts')) {
				fileList.push(filePath);
			}
		}

		return fileList;
	};
	try {
		const tsFiles = await getTsFiles(dir);
		return tsFiles;
	} catch (err) {
		console.error(`Error reading directory ${dir}:`, err);
		throw err;
	}
};
