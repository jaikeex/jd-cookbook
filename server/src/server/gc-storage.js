import { Storage } from '@google-cloud/storage';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const gc = new Storage({
  keyFilename: join(__dirname, '../../env/cookbook-gc.json'),
  projectId: 'cookbook-382408'
});

export const gcBucket = gc.bucket('jd-cookbook-images');
