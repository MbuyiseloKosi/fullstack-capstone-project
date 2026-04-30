const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI from your environment variable
const uri = process.env.MONGODB_URI || 'mongodb+srv://mbuyikosi_db_user:wWvbRFNWDab59IuK@cluster0.rwdg25i.mongodb.net/giftlink_db?retryWrites=true&w=majority';

// Create a new MongoClient instance
const client = new MongoClient(uri);

// Function to connect to the database
async function connectToDatabase() {
  try {
    // This is the required line for the task
    await client.connect();
    console.log('Successfully connected to MongoDB');
    return client.db('giftlink_db');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

// Export the function and client
module.exports = { connectToDatabase, client };