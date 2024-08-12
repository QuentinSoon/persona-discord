var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import path from 'path';
export const loadFiles = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const getTsFiles = (dir, fileList = []) => __awaiter(void 0, void 0, void 0, function* () {
        const files = yield fs.promises.readdir(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = yield fs.promises.stat(filePath);
            if (stat.isDirectory()) {
                yield getTsFiles(filePath, fileList);
            }
            else if (file.endsWith('.ts')) {
                fileList.push(filePath);
            }
        }
        return fileList;
    });
    try {
        const tsFiles = yield getTsFiles(dir);
        return tsFiles;
    }
    catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
        throw err;
    }
});
