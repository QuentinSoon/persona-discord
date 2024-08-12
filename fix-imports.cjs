const fs = require('fs');
const path = require('path');

const directory = path.resolve(__dirname, 'build');

function addJsExtension(filePath) {
	let content = fs.readFileSync(filePath, 'utf8');

	// Add .js extension to import statements
	content = content.replace(
		/(import .* from\s+['"])(\..*)(['"])/g,
		'$1$2.js$3'
	);

	fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(dir) {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const fullPath = path.join(dir, file);

		if (fs.lstatSync(fullPath).isDirectory()) {
			processDirectory(fullPath);
		} else if (fullPath.endsWith('.js')) {
			addJsExtension(fullPath);
		}
	});
}

processDirectory(directory);
console.log('Imports fixed.');
