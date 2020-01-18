const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        min: -180,
        max: +180,
        default: 0
    },
    longitude: {
        type: Number,
        min: -180,
        max: +180,
        default: 0
    }
}, {
    versionKey: false
})