// backend/models/Gift.js
const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    occasion: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    isFree: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Gift', giftSchema);