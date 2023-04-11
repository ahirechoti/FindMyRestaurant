const { listShopsbyCategory, listShopsbyLocality, listShopsbyRating, updateShopDetails, addNewShop, deleteShop } = require('../controllers/shop.controller');

const getShopsbyLocality = (app) => {
    app.get('/fms/api/v1/getShopbyzip', listShopsbyLocality);
}
const getShopsbyCategory = (app) => {
    app.get('/fms/api/v1/getShopbyCat', listShopsbyCategory);
}
const getShopsbyRating = (app) => {
    app.get('/fms/api/v1/getShopbyRating', listShopsbyRating);
}
const updateShop = (app) => {
    app.post('/fms/api/v1/updateShop', updateShopDetails);
}
const addShop = (app) => {
    app.put('/fms/api/v1/addShop', addNewShop);
}
const delShop = (app) => {
    app.delete('/fms/api/v1/delShop', deleteShop);
}
module.exports = { addShop, getShopsbyLocality, getShopsbyCategory, getShopsbyRating, updateShop, delShop }