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

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

module.exports = app;