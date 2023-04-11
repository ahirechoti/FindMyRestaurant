const shopModel = require('../models/shop.model');
const { shopObject, ratingComparisionCOnstants } = require('../utils/shop.util');

const addNewShop = async (req, res) => {
    try {
        const shopObj = {
            id: req.body.id,
            name: req.body.name,
            categories: req.body.categories,
            address: req.body.address,
            zipcode: req.body.zipcode
        }
        if (!shopObj.name || (!shopObj.categories || shopObj.categories.length === 0) || !shopObj.address || !shopObj.zipcode) {
            console.error("Error in addNewShop input request: " + JSON.stringify(shopObj));
            return res.status(400).send({
                message: "Bad request"
            })
        }
        const shop = await shopModel(shopObj);
        await shop.save();
        res.status(200).send({
            message: "Shop added suuccsfully",
            shop: shopObject(shop)
        });
    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const listShopsbyLocality = async (req, res) => {
    try {
        const queryParam = {};
        if (req.query.zipcode) {
            queryParam['zipcode'] = req.query.zipcode;
        } else {
            return res.status(400).send({
                message: "Bad request"
            })
        }
        const shops = await shopModel.find(queryParam);
        res.status(200).send(shopObject(shops));
    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const listShopsbyCategory = async (req, res) => {
    try {
        const queryParam = {};

        if ((req.query.category && req.query.category.length > 0) || (!req.query.searchType && ["ANY", "ONLY"].indexOf(req.query.searchType) == -1)) {
            if(req.query.searchType == "ANY"){
                queryParam['categories'] = {'$elemMatch' : {'$eq': req.query.category}};
            }else{
                queryParam['categories'] = Array.isArray(req.query.category) ? req.query.category : [req.query.category];
            }
            
        } else {
            return res.status(400).send({
                message: "Bad request"
            })
        }
        //console.log(req.query, queryParam);
        const shops = await shopModel.find(queryParam);
        res.status(200).send(shopObject(shops));
    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const listShopsbyRating = async (req, res) => {
    try {
        const queryParam = {};
        if (!req.query.rating || !req.query.logic || !ratingComparisionCOnstants[req.query.logic]) {
            return res.status(400).send({
                message: "Bad request"
            })
        } else {
            let queryLogic = ratingComparisionCOnstants[req.query.logic];
            queryParam['rating'] = {};
            queryParam.rating[queryLogic] = req.query.rating;
        }
        //console.log(queryParam);
        const shops = await shopModel.find(queryParam);
        res.status(200).send(shopObject(shops));
    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const updateShopDetails = async (req, res) => {
    try {
        if (req.body.id) {
            const shop = await shopModel.findOne({ 'id': req.body.id });
            shop.name = req.body.name || shop.name;
            shop.rating = req.body.rating || shop.rating;
            shop.address = req.body.address || shop.address;
            shop.zipcode = req.body.zipcode || shop.zipcode;
            shop.categories = req.body.categories || shop.categories;
            await shop.save();
            res.status(200).send({
                message: "Shop details has been updated",
                shop: shopObject(shop)
            })
        } else {
            res.status(400).send({
                message: "Bad request"
            })
        }
    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const deleteShop = async (req, res) => {
    try {
        const queryParam = {};
        if (req.body.id) {
            queryParam['id'] = req.body.id;
        } else {
            return res.status(400).send({
                message: "Bad request"
            })
        }

        const shop = await shopModel.findOne(queryParam);
        if (!shop) {
            res.status(500).send({
                message: `Shop with id ${req.body.id} does not exists`
            })
        } else {
            await shopModel.findOneAndDelete(queryParam);
            res.status(200).send({
                message: `Shop details with id ${queryParam['id']} has been deleted successfully.`

            })
        }

    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = { listShopsbyCategory, listShopsbyLocality, listShopsbyRating, updateShopDetails, addNewShop, deleteShop };