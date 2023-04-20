import { Storage } from '@google-cloud/storage';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const gc = new Storage({
  keyFilename: join(__dirname, '../../gc.json'),
  projectId: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID
});

export const gcBucket = gc.bucket('jd-cookbook-images');
