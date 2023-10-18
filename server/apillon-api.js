const axios = require('axios');
require('dotenv').config()

const apiKey = process.env.APILLON_API_KEY;
const apiSecret = process.env.APILLON_API_SECRET;

const apillonAuthAPI = axios.create({
  baseURL: 'https://api.apillon.io/auth',
  timeout: 3000,
  headers: {
    'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`
  }
});

module.exports = { apillonAuthAPI };