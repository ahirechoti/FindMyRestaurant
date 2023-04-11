const shopObject = (shops) => {
    let result = [];
    try {
        
        if(Array.isArray(shops)){
            shops.forEach(shop => {
                result.push({
                    id: shop.id,
                    name: shop.name,
                    categories : shop.categories,
                    rating: shop.rating,
                    address: shop.address,
                    zipcode: shop.zipcode,
                    createdAt: shop.createdAt
                })
            })
        }else{
            var shop = shops;
            result.push({
                id: shop.id,
                name: shop.name,
                categories : shop.categories,
                rating: shop.rating,
                address: shop.address,
                zipcode: shop.zipcode,
                createdAt: shop.createdAt
            })
        }
        //return result;
    } catch (error) {
        console.error(error);
    }
    return result;
}
const ratingComparisionCOnstants = {
    eq: "$eq",
    gt : "$gt",
    gte : "$gte",
    lt: "$lt",
    lte: "$lte",
    noteq : "$ne"
}
module.exports = {
    shopObject, ratingComparisionCOnstants
}