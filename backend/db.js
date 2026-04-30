const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let db = null;

async function connectToDatabase() {
  if (db) return db;
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const dbName = uri.split('/')[3].split('?')[0];
    console.log('Connecting to database:', dbName);
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

module.exports = { connectToDatabase };