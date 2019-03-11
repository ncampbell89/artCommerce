const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    timestamp: {
        type: String,
        default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
});

module.exports = mongoose.model('users', userSchema);