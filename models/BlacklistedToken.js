const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
