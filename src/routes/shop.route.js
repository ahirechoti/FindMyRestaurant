const { listShopsbyCategory, listShopsbyLocality, listShopsbyRating, updateShopDetails, addNewShop, deleteShop } = require('../controllers/shop.controller');

const addShop = (app) => {
    app.put('/fms/api/v1/addShop', addNewShop);
}

module.exports =  {addShop}