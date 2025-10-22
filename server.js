const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const stringRoutes = require('./routes/stringRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/', stringRoutes); // Changed from '/api' to '/'

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});