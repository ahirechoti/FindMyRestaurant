const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    name: {
       type: String,
       required: true 
    },
    categories:{
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true
    },
    zipcode:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: () => {return Date.now()}
    }
});

module.exports = mongoose.model("Shop", shopSchema, "Shop");