require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
  res.json({
    'url': req.body.url,
    'short_url': req.body.short_url
  });
})

// Start server
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
