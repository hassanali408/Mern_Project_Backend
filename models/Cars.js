const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  make: { type: String, required: true },
  color: { type: String, required: true },
  registrationNo: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
