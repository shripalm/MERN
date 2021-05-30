const orderSchema = require('../model/Order')
const productSchema = require('../model/Product')
const userSchema = require('../model/User')

const orderProduct = async(uid, pid, paymentMethod = 'CASH') => {
    return await productSchema.findById(pid).then(async prodResponse => {
        if (prodResponse.stock > 1) {
            const userResponse = await userSchema.findById(uid)
            let data = {
                uID: uid,
                uName: userResponse.userName,
                uEmail: userResponse.email,
                uNumber: userResponse.number,
                sID: prodResponse.sellerID,
                pID: pid,
                pName: prodResponse.name,
                pSKU: prodResponse.sku,
                pCategories: prodResponse.categories,
                pTags: prodResponse.tags,
                pDescription: prodResponse.description,
                paymentMethod: paymentMethod,
                total: prodResponse.price
            }

            const prepareOrder = new orderSchema(data)
            return await prepareOrder.save().then(async newOrder => {
                await userSchema.findByIdAndUpdate(uid, { totalOrders: userResponse.totalOrders + 1 })
                await productSchema.findByIdAndUpdate(pid, { stock: prodResponse.stock - 1 })
                return { success: true, msg: 'Order Successfully Placed', data: newOrder }
            }).catch(err => {
                return { success: false, msg: err.message }
            })
        } else {
            return ({ success: false, msg: 'Out of Stock' })
        }
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}

const getOrderOfUser = async(uid) => {
    return await orderSchema.find({ uID: uid }).then(response => {
        return ({ success: true, msg: response.length + " orders found", data: response })
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}

const getOrderOfSeller = async(sid) => {
    return await orderSchema.find({ sID: sid }).then(response => {
        return ({ success: true, msg: response.length + " orders found", data: response })
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}

async function getAllOrders() {
    const response = await orderSchema.find()
    return ({ success: true, msg: response.length + ' Orders Found', data: response })
}

async function getOrderById(_id) {
    return await orderSchema.findById(_id).then(response => {
        return ({ success: true, msg: 'Order Found', data: response })
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}

module.exports = {
    orderProduct,
    getOrderOfUser,
    getOrderOfSeller,
    getAllOrders,
    getOrderById
}