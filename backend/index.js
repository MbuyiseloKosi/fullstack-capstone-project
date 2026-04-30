const express = require('express');
const cors = require('cors');
const natural = require('natural');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Landing Page (Task 12)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>GiftLink</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 60px; background: #f0f8ff; }
          h1 { color: #28a745; font-size: 3rem; }
          p { font-size: 1.2rem; color: #555; margin: 20px 0; }
          .btn { display: inline-block; padding: 15px 35px; font-size: 1.1rem;
                 background: #007bff; color: white; border: none; border-radius: 8px;
                 cursor: pointer; text-decoration: none; }
        </style>
      </head>
      <body>
        <h1>GiftLink</h1>
        <p>Connect with people giving away household items free of charge.</p>
        <a class="btn" href="/api/gifts">Get Started</a>
      </body>
    </html>
  `);
});

// Seed Route (inserts 16 items directly into connected database)
app.get('/seed', async (req, res) => {
  try {
    const { connectToDatabase } = require('./db');
    const db = await connectToDatabase();
    await db.collection('items').deleteMany({});
    const result = await db.collection('items').insertMany([
      {"name": "Wooden Chair", "category": "Furniture", "description": "Solid wood dining chair.", "condition": "Good", "location": "Johannesburg"},
      {"name": "Glass Coffee Table", "category": "Furniture", "description": "Modern glass top table.", "condition": "Like New", "location": "Pretoria"},
      {"name": "Desk Lamp", "category": "Lighting", "description": "Adjustable LED desk lamp.", "condition": "Good", "location": "Cape Town"},
      {"name": "Bookshelf", "category": "Furniture", "description": "5-tier wooden bookshelf.", "condition": "Fair", "location": "Durban"},
      {"name": "Ceramic Vase", "category": "Decor", "description": "Hand-painted ceramic vase.", "condition": "Excellent", "location": "Johannesburg"},
      {"name": "Area Rug", "category": "Decor", "description": "Blue and white patterned rug.", "condition": "Good", "location": "Pretoria"},
      {"name": "Wall Mirror", "category": "Decor", "description": "Large rectangular mirror.", "condition": "Good", "location": "Cape Town"},
      {"name": "Potted Fern", "category": "Garden", "description": "Healthy fern in a terracotta pot.", "condition": "Good", "location": "Durban"},
      {"name": "Mountain Bike", "category": "Sports", "description": "26-inch mountain bike.", "condition": "Fair", "location": "Johannesburg"},
      {"name": "Bicycle Helmet", "category": "Sports", "description": "Safety helmet size M.", "condition": "Good", "location": "Pretoria"},
      {"name": "Camping Tent", "category": "Sports", "description": "2-person waterproof tent.", "condition": "Like New", "location": "Cape Town"},
      {"name": "Non-Stick Pot Set", "category": "Kitchen", "description": "Set of 3 pots with lids.", "condition": "Good", "location": "Durban"},
      {"name": "Electric Blender", "category": "Kitchen", "description": "High-speed blender.", "condition": "Good", "location": "Johannesburg"},
      {"name": "2-Slice Toaster", "category": "Kitchen", "description": "Silver chrome toaster.", "condition": "Fair", "location": "Pretoria"},
      {"name": "Drip Coffee Maker", "category": "Kitchen", "description": "Makes 12 cups.", "condition": "Good", "location": "Cape Town"},
      {"name": "Stainless Steel Cutlery Set", "category": "Kitchen", "description": "24-piece cutlery set.", "condition": "Excellent", "location": "Durban"}
    ]);
    res.json({ message: 'Seeded successfully', count: result.insertedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = app;