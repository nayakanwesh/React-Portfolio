// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 const dotenv = require('dotenv');



// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Set port
const PORT = process.env.PORT || 3006;

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    
    const { name, email, subject, message } = req.body;
    
    // Validate input
    if (!name || !email || !subject || !message) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create new contact
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    console.log('Saving contact to database...');
    
    // Save to database
    const savedContact = await newContact.save();
    
    console.log('Contact saved successfully:', savedContact._id);
    
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running properly' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'}`);
});