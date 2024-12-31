require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productRoute = require('./routes/product')
const cors = require('cors')

const app = express();
app.use(express.json(),
cors({
  origin: 'https://linex-inventory.vercel.app/', // Allow requests from frontend
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product',productRoute)

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err));

module.exports = app;
