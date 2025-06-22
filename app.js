const express = require('express');
const app = express();
const auth = require('./routes/auth');
const list = require('./routes/list');

// Only connect DB if not in test mode
if (process.env.NODE_ENV !== 'test') {
  require('./conn/conn');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.use('/api/v1', auth);
app.use('/api/v2', list);

module.exports = app; // ✅ Only export app — no .listen() here
