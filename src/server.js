const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4040;
if(process.env.MONGOCLIENT){
    mongoose.connect(process.env.MONGOCLIENT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'FINDMYSHOPDB'
    });
    const db = mongoose.connection;
    db.once('open', ()=>{
        console.log('Connected to MongoDB');
    });
    db.on('error', (e)=>{
        console.error('MongoDB error details: '+e);
        process.exit();
    })
}else{
    console.error('Mongodb url required.')
}

const { addShop } = require('./routes/shop.route');
addShop(app);


app.listen(PORT, ()=>{
    console.log(`Find my shop application listening at http://localhost:${PORT}/`);
})