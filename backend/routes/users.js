// backend/routes/users.js
const express = require('express');
const router = express.Router();

// User routes
router.get('/', (req, res) => {
    res.json({ message: 'User routes' });
});

// Create user
router.post('/', (req, res) => {
    res.json({ message: 'Create user', data: req.body });
});

// Get single user
router.get('/:id', (req, res) => {
    res.json({ message: 'Get user', id: req.params.id });
});

// Update user
router.put('/:id', (req, res) => {
    res.json({ message: 'Update user', id: req.params.id, data: req.body });
});

// Delete user
router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete user', id: req.params.id });
});

module.exports = router;