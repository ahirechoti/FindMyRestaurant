const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        enum:{
            value:['kids', 'sports', 'men', 'women', 'ethnic', 'casual'],
            message: '{Value} is not a valid category'
        }
    }
});

export default mongoose.model("Category", categorySchema, "Category");