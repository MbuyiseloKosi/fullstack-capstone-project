const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = new RegExp(category, 'i');
    }
    const items = await db.collection('items').find(query).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search items' });
  }
});

module.exports = router;