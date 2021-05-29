const productSchema = require('../model/Product')

async function getAllProducts() {
    const response = await productSchema.find()
    return ({ success: true, msg: response.length + ' Products Found', data: response })
}

module.exports = {
    getAllProducts
}