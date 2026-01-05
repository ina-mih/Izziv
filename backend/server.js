const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

const articlesRoutes = require('./routes/articles');
app.use('/api/articles', articlesRoutes);

const locationsRoutes = require('./routes/locations');
app.use('/api/locations', locationsRoutes);

const stockRoutes = require('./routes/stock');
app.use('/api/stock', stockRoutes);

const documentsRoutes = require('./routes/documents');
app.use('/api/documents', documentsRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));