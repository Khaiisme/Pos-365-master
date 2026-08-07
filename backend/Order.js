const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  table: String,
  orders: [
    {
      name: String,
      price: Number,
      index: Number
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);

