const shopModel = require('../models/shop.model');

const addNewShop = async (req, res) => {
    try {
        const shopObj = {
            name: req.body.name,
            categories: req.body.categories,
            address: req.body.address,
            zipcode: req.body.zipcode
        }
        if(!shopObj.name || (!shopObj.categories || shopObj.categories.length === 0) || !shopObj.address || !shopObj.zipcode){
            console.error("Error in addNewShop input request: "+JSON.stringify(shopObj));
            return res.status(400).send({
                message: "Bad request"
            })
        }
        const shop = await shopModel(shopObj);
        await shop.save();
        res.status(200).send({
            message: "Shop added suuccsfully",
            shop: shop
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
        if(req.query.zipcode){
            queryParam['zipcode'] = req.query.zipcode;
        }else{
            return res.status(400).send({
                message: "Bad request"
            })
        }
        const shops = await shopModel.find(queryParam);
        res.status(200).send(shops);
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

        if(req.query.category && req.query.category.length > 0){
            queryParam['categories'] = Array.isArray(req.query.category) ? req.query.category : [req.query.category];
        }else{
            return res.status(400).send({
                message: "Bad request"
            })
        }
        //console.log(req.query, queryParam);
        const shops = await shopModel.find(queryParam);
        res.status(200).send(shops);
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
        if(req.body.rating){
            let logic = req.body.logic || '$gte';
            queryParam['rating'] = {logic : req.body.rating};
        }else{
            return res.status(400).send({
                message: "Bad request"
            })
        }
        const shops = await shopModel.find(queryParam);
        res.status(200).send(shops);
    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const updateShopDetails = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const deleteShop = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error details: " + error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = { listShopsbyCategory, listShopsbyLocality, listShopsbyRating, updateShopDetails, addNewShop, deleteShop };