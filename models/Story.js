const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    prompt: String,
    story: String,
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  const Story = mongoose.model('Story', storySchema);
  module.exports = Story;

