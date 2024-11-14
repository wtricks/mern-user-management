import multer from 'multer';
import path from 'path';
import fs from 'node:fs';


import { rootDirectory } from './constants.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(rootDirectory, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

export default multer({ storage });
