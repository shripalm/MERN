const sellerSchema = require('../model/Seller')
const { compare } = require('bcrypt')
const { verify } = require('jsonwebtoken')
const { secret } = require('../config/envExport')

const registerSeller = async(data) => {
    const emailCheck = await sellerSchema.find({ email: data.email })
    if (emailCheck.length > 0) return { success: false, msg: 'Email is already taken' }
    const prepareSeller = new sellerSchema(data)
    return await prepareSeller.save().then(newSeller => {
        return { success: true, msg: 'Seller Registered', data: newSeller }
    }).catch(err => {
        return { success: false, msg: err.message }
    })
}

const loginSeller = async(data) => {
    const checkData = await sellerSchema.find({ email: data.email }, { email: true, password: true })
    if (checkData.length == 0) return { success: false, msg: 'Email is invalid' }
    const passCheck = await compare(data.password, checkData[0].password)
    if (!passCheck) return { success: false, msg: 'Password is invalid' }
    const getData = await sellerSchema.findOne({ email: data.email }, { password: false })
    return { success: true, msg: 'Logged in', data: getData }
}

const validateSeller = async(req, res, next) => {
    var retError = ''
    if (!req.headers.authorization) {
        retError += 'Token not found'
    } else {
        let bearerToken = req.headers.authorization.split(" ")[1];
        try {
            verify(bearerToken, secret)
        } catch (e) {
            retError += e.message
        } finally {}
        if (retError.length == 0) {
            var confirmation = verify(bearerToken, secret)
            var seller = await sellerSchema.findById(confirmation.id)
            if (seller.length == 0) retError += 'You are not authorized.'
        }
    }
    if (retError.length != 0) res.json({ success: false, msg: retError })
    else next()
}

async function getAllSellers() {
    const response = await sellerSchema.find()
    return ({ success: true, msg: response.length + ' Sellers Found', data: response })
}

async function getSellerById(_id) {
    return await sellerSchema.findById(_id).then(response => {
        return ({ success: true, msg: 'Seller Found', data: response })
    }).catch(err => {
        return ({ success: false, msg: err.message })
    })
}

module.exports = {
    registerSeller,
    loginSeller,
    validateSeller,
    getAllSellers,
    getSellerById

}