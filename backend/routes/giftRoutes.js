const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db'); // Import the DB connection

// Route 1: Get all items (/api/gifts)
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('items').find({}).toArray();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Route 2: Get a single item by ID (/api/gifts/:id)
router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    
    // Validate the ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

module.exports = router;