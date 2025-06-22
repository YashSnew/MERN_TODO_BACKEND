const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // good practice to prevent duplicates
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  }],
}, {
  timestamps: true // optional: adds createdAt, updatedAt
});

module.exports = mongoose.model('User', userSchema);
