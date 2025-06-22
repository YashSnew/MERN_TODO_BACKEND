const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // changed from array to single ref
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('List', listSchema);
