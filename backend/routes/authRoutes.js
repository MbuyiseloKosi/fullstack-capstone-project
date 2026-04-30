const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existing = await db.collection('users').findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ username, email, password: hashed, createdAt: new Date() });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing credentials' });
    const user = await db.collection('users').findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/update', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { userId, email, username } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID required' });
    const { ObjectId } = require('mongodb');
    const updateData = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: updateData });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;