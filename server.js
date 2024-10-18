const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// Serve the API
app.get('/', (req, res) => {
  res.send('Hello, client authenticated with mutual TLS!');
});

const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: fs.readFileSync('ca-cert.pem'),  // Trusted CA
  requestCert: true,  // Require client certificate
  rejectUnauthorized: true  // Reject unauthorized clients
};

https.createServer(options, app).listen(3000, () => {
  console.log('Server running on https://localhost:3000');
});

