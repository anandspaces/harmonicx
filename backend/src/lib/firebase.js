import admin from "firebase-admin";
import path from "path";

const serviceAccount = await import(path.resolve("src/serviceAccountKey.json"), {
  assert: { type: "json" }
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default || serviceAccount),
    storageBucket: serviceAccount.default ? serviceAccount.default.project_id + ".appspot.com" : serviceAccount.project_id + ".appspot.com"
  });
}

const bucket = admin.storage().bucket();

export default bucket;
