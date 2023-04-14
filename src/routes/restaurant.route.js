const restController = require('../controllers/restaurant.controller');

const addRest = (app) => {
    app.post('/api/restaurant/add', restController.addRestaurant);
}
const getAllRetaurant = (app) => {
    app.get('/api/restaurant/', restController.fetchAllRest);
}

const getRestaurantbyCategories = (app) => {
    app.get('/api/restaurant/categories', restController.fetchRestaurantbyCat);
}
const getRestaurantbyCategory = (app) => {
    app.get('/api/restaurant/categories/:category', restController.fetchRestaurantbyCat);
}
const getRestaurantbyID = (app) => {
    app.get('/api/restaurant/:id', restController.fetchRestaurantbyId);
}
const getRestaurantbyrating = (app) => {
    app.get('/api/restaurant/rating/:ratingValue', restController.fetchRestaurantbyrating);
}
const restRoute = { addRest, getAllRetaurant, getRestaurantbyCategories, getRestaurantbyCategory, getRestaurantbyID, getRestaurantbyrating };

module.exports = restRoute;

