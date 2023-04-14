const restModel = require('../models/restaurant.model');
const httpStatus = require('http-response-codes');

const addRestaurant = async (req, res) => {
    try {
        if (!req.body || !req.body.name || !req.body.category || !req.body.imageURL || !req.body.location ||
            !req.body.phone || !req.body.rating) {
            return res.status(httpStatus.HTTP_OK).send({
                message: "Content cannot be empty"
            });
        }

        const restObj = {
            "name": req.body.name,
            "description": req.body.description,
            "category": req.body.category,
            "imageURL": req.body.imageURL,
            "location": req.body.location,
            "phone": req.body.phone,
            "rating": req.body.rating
        };

        const restaurant = await restModel(restObj);
        await restaurant.save();
        return res.status(httpStatus.HTTP_OK).send(restaurant);

    } catch (error) {
        console.error("Some error occurred while creating the Restaurant:", error);
        res.status(httpStatus.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Some error occurred while creating the Restaurant"
        })
    }
}

const fetchAllRest = async (req, res) => {
    try {
        const result = {
            restaurants: [],
            message: "Restaurants fetched successfully."
        }
        const rests = await restModel.find();
        if (!rests) {
            return res.status(httpStatus.HTTP_OK).send(result);
        }
        result.restaurants = rests;
        return res.status(httpStatus.HTTP_OK).send(result);
    } catch (error) {
        console.error("Some error occured while fetching the Restaurants:", error);
        res.status(httpStatus.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Some error occured while fetching the Restaurants."
        })
    }
}

const fetchRestaurantbyCat = async (req, res) => {
    try {
        if (!req.query) {
            return res.status(httpStatus.HTTP_OK).send([]);
        }
        const queryParam = {
            'category': { '$in': (req.query.caterogy || [req.params.category]) }
        }
        console.log(req.body, queryParam, req.params);

        const result = await restModel.find(queryParam) || [];

        return res.status(httpStatus.HTTP_OK).send(result);
    } catch (error) {
        console.error("Some error occurred while fetching Restaurant:", error);
        res.status(httpStatus.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Some error occurred while fetching Restaurant."
        })
    }
}

const fetchRestaurantbyId = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(httpStatus.HTTP_OK).send([]);
        }
        const queryParam = {
            '_id': req.params.id
        }
        const result = await restModel.findOne(queryParam);
        if (!result) {
            return res.status(httpStatus.HTTP_NOT_FOUND).send({
                message: "No Restaurant found with the given ID"
            });
        }
        return res.status(httpStatus.HTTP_OK).send(result);
    } catch (error) {
        console.error("Some error occurred while fetching Restaurant:", error);
        res.status(httpStatus.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Some error occurred while fetching Restaurant."
        })
    }
}

const fetchRestaurantbyrating = async (req, res) => {
    try {
        if (!req.params.ratingValue) {
            return res.status(httpStatus.HTTP_OK).send([]);
        }
        const queryParam = {
            'rating': { '$gte': req.params.ratingValue }
        }
        const result = await restModel.find(queryParam) || [];
        return res.status(httpStatus.HTTP_OK).send(result);
    } catch (error) {
        console.error("Some error occurred while fetching Restaurant:", error);
        res.status(httpStatus.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Some error occurred while fetching Restaurant."
        })
    }
}

const updateRestaurantDetails = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Some error occurred while fetching Restaurant:", error);
        res.status(httpStatus.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Some error occured while fetching the Restaurant."
        })
    }
}

const restContrller = { 
    addRestaurant, 
    fetchAllRest, 
    fetchRestaurantbyCat, 
    fetchRestaurantbyId, 
    fetchRestaurantbyrating,
    updateRestaurantDetails
 };
module.exports = restContrller;