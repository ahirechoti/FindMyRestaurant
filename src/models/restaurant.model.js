const mongoose = require('mongoose');

var min = [0, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).'];
var max = [5, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'];

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    category:{
        type: String,
        required: true
    },
    imageURL:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        default: 0,
        min: min,
        max:max
    },
    createdAt: {
        type: Date,
        default: () => { return Date.now() },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => { return Date.now() }
    }

});

module.exports = mongoose.model("Restaurant", restaurantSchema, "Restaurant");