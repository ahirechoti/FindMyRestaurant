const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4040;
mongoose.connect((process.env.MONGOCLIENT || 'mongodb://127.0.0.1:27017'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'FINDMYRESTAURANTDB'
    });
    const db = mongoose.connection;
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
    db.on('error', (e) => {
        console.error('MongoDB error details: ' + e);
        process.exit();
    })

const restRoute = require('./routes/restaurant.route');
//Below are CRUD operations.

//CREATE API
restRoute.addRest(app);

//READ API
restRoute.getAllRetaurant(app);
restRoute.getRestaurantbyCategories(app);
restRoute.getRestaurantbyCategory(app);
restRoute.getRestaurantbyID(app);
restRoute.getRestaurantbyrating(app);

//Update API
restRoute.updateRestDetails(app);

//DELETE API
restRoute.deleteRestByID(app);
restRoute.deleteAllRestaurant(app);

app.listen(PORT, () => {
    console.log(`Find my shop application listening at http://localhost:${PORT}/`);
})