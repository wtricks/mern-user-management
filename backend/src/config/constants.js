import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootDirectory = path.resolve(__dirname, '..', '..');
