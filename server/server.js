const express = require('express');
const app = express();
const { apillonAuthAPI } = require('./apillon-api');

app.use((req, res, next) => {
  // Replace the * value below with your own origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json())

app.get('/session-token', async (req, res) => {
  const response = await apillonAuthAPI.get('/session-token');
  res.json(response.data);
})

app.post('/verify-login', async (req, res) => {
  const token = req.body.token;
  const response = await apillonAuthAPI.post(`/verify-login`, { token });
  res.json(response.data);
})

const port = 3000;
app.listen(port, () => {
  console.log(`Apillon OAuth backend listening on port ${port}`);
})