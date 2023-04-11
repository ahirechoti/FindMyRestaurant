const mongoose = require('mongoose');
var min = [0, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).'];
var max = [5, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'];
const shopSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        min: 1
    },
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        enum: ["Kids", "Men", "Women", "Ethnic", "Formals", "Casuals", "Sports"],
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        max: max,
        min: min
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    zipcode: {
        type:String, 
        match: /^[1-9][0-9]{5}$/, 
        required: true
    },
    createdAt: {
        type: Date,
        default: () => { return Date.now() },
        immutable: true
    }
});

module.exports = mongoose.model("Shops", shopSchema, "Shops");