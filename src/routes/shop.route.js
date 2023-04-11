const { listShopsbyCategory, listShopsbyLocality, listShopsbyRating, updateShopDetails, addNewShop, deleteShop } = require('../controllers/shop.controller');

const getShopsbyLocality = (app) => {
    app.get('/fms/api/v1/getShopbyzip', listShopsbyLocality);
}
const addShop = (app) => {
    app.put('/fms/api/v1/addShop', addNewShop);
}

module.exports =  { addShop, getShopsbyLocality }