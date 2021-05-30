const productSchema = require('../model/Product')
const sellerSchema = require('../model/Seller')

async function getAllProducts() {
    const response = await productSchema.find()
    return ({ success: true, msg: response.length + ' Products Found', data: response })
}

async function addProducts(data) {
    const prepareProducts = new productSchema(data)
    return await prepareProducts.save().then(async newProduct => {
        let response = await sellerSchema.findById(data.sellerID, { totalProducts: true })
        await sellerSchema.findByIdAndUpdate(data.sellerID, { totalProducts: response.totalProducts + 1 })
        return { success: true, msg: 'Product Added', data: newProduct }
    }).catch(err => {
        return { success: false, msg: err.message }
    })
}

async function viewProductBySID(_id) {
    return await productSchema.find({ sellerID: _id }).then(response => {
        return ({ success: true, msg: response.length + " products found", data: response })
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}


async function deleteProducts(_id) {
    return await productSchema.findByIdAndDelete(_id).then(response => {
        return ({ success: true, msg: "Product Deleted", data: response })
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}

async function getProductById(_id) {
    return await productSchema.findById(_id).then(response => {
        return ({ success: true, msg: 'Product Found', data: response })
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}

module.exports = {
    getAllProducts,
    addProducts,
    viewProductBySID,
    deleteProducts,
    getProductById
}