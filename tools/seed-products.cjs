const admin = require('firebase-admin');
const fs = require('fs');

if (!fs.existsSync('./serviceAccount.json')) {
  console.error('serviceAccount.json not found in project root. Download from Firebase Console -> Project Settings -> Service Accounts.');
  process.exit(1);
}

const serviceAccount = require('../serviceAccount.json') || require('./serviceAccount.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const products = [
  {
    title: 'Minimal Sneakers',
    price: 59.99,
    description: 'Lightweight everyday sneakers.',
    category: 'shoes',
    image: '',
  },
  {
    title: 'Classic Tee',
    price: 19.99,
    description: 'Comfortable cotton t-shirt.',
    category: 'clothing',
    image: '',
  },
  {
    title: 'Everyday Mug',
    price: 9.99,
    description: 'Ceramic mug for coffee and tea.',
    category: 'home',
    image: '',
  },
];

async function seed() {
  for (const p of products) {
    const ref = await db.collection('products').add({ ...p, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    console.log('Added product', p.title, 'id:', ref.id);
  }
}

seed().then(() => process.exit(0)).catch((err) => { console.error(err); process.exit(1); });
