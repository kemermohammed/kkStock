const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
