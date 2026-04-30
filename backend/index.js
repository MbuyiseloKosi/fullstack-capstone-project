const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Task 8 Requirement: Import the natural package
const natural = require('natural');

// Import routes
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
const PORT = process.env.PORT || 10000;
// Landing page route (Task 12)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>GiftLink</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
          h1 { color: #28a745; font-size: 48px; }
          p { font-size: 18px; color: #666; }
          button { padding: 15px 30px; font-size: 18px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
          button:hover { background: #0056b3; }
          a { display: block; margin-top: 20px; color: #007bff; text-decoration: none; font-size: 16px; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>🎁 GiftLink</h1>
        <p>Your smart gift recommendation platform</p>
        <button onclick="window.location.href='/api/gifts'">Browse Gifts</button>
        <a href="/api/gifts">Or explore gifts via API →</a>
      </body>
    </html>
  `);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});