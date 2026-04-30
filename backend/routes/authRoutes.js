const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');
const bcrypt = require('bcrypt'); // You may need to install this: npm install bcrypt
const jwt = require('jsonwebtoken'); // You may need to install this: npm install jsonwebtoken
require('dotenv').config();

// Middleware to verify token (optional but good for /update)
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  // Simple validation for the assignment (replace with real JWT logic if needed)
  next();
};

// 1. Registration API: POST /register
router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user exists
    const existingUser = await db.collection('users').findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    await db.collection('users').insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. Login API: POST /login
router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate simple token (for assignment purposes)
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    res.json({ 
      message: 'Login successful', 
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Update User API: PUT /update
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { userId } = req.body; // In a real app, this would come from the decoded token
    const { email, username } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const updateData = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;

    await db.collection('users').updateOne(
      { _id: new require('mongodb').ObjectId(userId) },
      { $set: updateData }
    );

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;