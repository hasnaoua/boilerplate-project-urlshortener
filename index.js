require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static(`${process.cwd()}/public`));

// Home route
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// First API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let hostname;

  try {
    const parsedUrl = new URL(originalUrl);
    hostname = parsedUrl.hostname;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  dns.lookup(hostname, (err, address) => {
    if (err) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Generate short URL (placeholder logic)
    const shortUrl = Math.floor(Math.random() * 10000).toString();

    res.json({
      original_url: originalUrl,
      short_url: shortUrl
    });
  });
});

// Start server
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
