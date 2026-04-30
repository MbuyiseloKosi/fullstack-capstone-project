const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

let db = null;

async function connectToDatabase() {
  if (db) return db;
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Successfully connected to MongoDB');
    db = client.db('giftlink_db');
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

module.exports = { connectToDatabase };