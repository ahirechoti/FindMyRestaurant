const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    name: {
       type: String,
       required: true 
    },
    category:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Category",
        required: true
    },
    rating: {
        type: Number,
        required: true
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

export default mongoose.model("Shop", shopSchema, "Shop");