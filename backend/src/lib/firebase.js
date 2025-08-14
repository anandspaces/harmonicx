import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, '../../serviceAccountKey.json');

if (!fs.existsSync(filePath)) {
  throw new Error(`Service account file not found at ${filePath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`
  });
}

export default admin.storage().bucket();
