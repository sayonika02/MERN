const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const OrderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: ''
    },
    mnumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    items: {
        type: String,
        default: ''
    },
    orderDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Order', OrderSchema);