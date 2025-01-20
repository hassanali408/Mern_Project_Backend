const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const storyRoutes = require('./routes/storyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stories', storyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
