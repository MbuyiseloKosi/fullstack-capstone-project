// backend/routes/gifts.js
const express = require('express');
const router = express.Router();
const Gift = require('../models/Gift');

// Get all gifts
router.get('/', async (req, res) => {
    try {
        const gifts = await Gift.find();
        res.json(gifts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single gift
router.get('/:id', async (req, res) => {
    try {
        const gift = await Gift.findById(req.params.id);
        if (!gift) return res.status(404).json({ error: 'Gift not found' });
        res.json(gift);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new gift
router.post('/', async (req, res) => {
    try {
        const gift = new Gift(req.body);
        await gift.save();
        res.status(201).json(gift);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update gift
router.put('/:id', async (req, res) => {
    try {
        const gift = await Gift.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!gift) return res.status(404).json({ error: 'Gift not found' });
        res.json(gift);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete gift
router.delete('/:id', async (req, res) => {
    try {
        const gift = await Gift.findByIdAndDelete(req.params.id);
        if (!gift) return res.status(404).json({ error: 'Gift not found' });
        res.json({ message: 'Gift deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;