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
const updateRestDetails = (app) => {
    app.put('/api/restaurant/:id', restController.updateRestaurantDetails);
}
const deleteRestByID = (app) => {
    app.delete('/api/restaurant/:id', restController.deleteRestaurant);
}
const deleteAllRestaurant = (app) => {
    app.delete('/api/restaurant/', restController.deleteRestaurant);
}
const restRoute = {  
    addRest, 
    getAllRetaurant, 
    getRestaurantbyCategories, 
    getRestaurantbyCategory, 
    getRestaurantbyID, 
    getRestaurantbyrating,
    updateRestDetails,
    deleteRestByID,
    deleteAllRestaurant
 };

module.exports = restRoute;

