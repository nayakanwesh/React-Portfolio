// Save this as api-test.js in your server directory
const fetch = require('node-fetch');

async function testApi() {
  try {
    console.log('Testing API endpoint...');
    const response = await fetch('http://localhost:27017/api/test');
    const data = await response.json();
    console.log('API response:', data);
    console.log('API test successful!');
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testApi();