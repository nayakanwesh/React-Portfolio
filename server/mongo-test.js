// Save this as mongo-test.js in your server directory
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log(`URI: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI);
    
    console.log('MongoDB connection successful!');
    
    // Create a simple schema and model
    const TestSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', TestSchema);
    
    // Try to write to the database
    console.log('Testing database write...');
    const testDoc = new Test({ name: 'Connection Test' });
    await testDoc.save();
    console.log('Successfully wrote to database!');
    
    // Try to read from the database
    console.log('Testing database read...');
    const result = await Test.findOne({ name: 'Connection Test' });
    console.log('Read result:', result);
    
    console.log('All tests passed! MongoDB is working correctly.');
  } catch (error) {
    console.error('MongoDB test failed:', error);
  } finally {
    mongoose.disconnect();
  }
}

testConnection();