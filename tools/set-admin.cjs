const admin = require('firebase-admin');
const fs = require('fs');

if (!fs.existsSync('./serviceAccount.json')) {
  console.error('serviceAccount.json not found in project root. Download from Firebase Console -> Project Settings -> Service Accounts.');
  process.exit(1);
}

const serviceAccount = require('../serviceAccount.json') || require('./serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const uid = process.argv[2];
if (!uid) {
  console.error('Usage: node tools/set-admin.cjs <USER_UID>');
  process.exit(1);
}

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Custom claim 'admin' set for user ${uid}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to set claim:', err);
    process.exit(1);
  });
