require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const app = express();

app.use(cors());
app.use(express.json());

// Test route first
app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users', require('./routes/users'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // Start the server ONLY after DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {  // binding to all interfaces
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


