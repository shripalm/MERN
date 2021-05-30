const adminSchema = require('../model/Admin')
const { compare } = require('bcrypt')
const { verify } = require('jsonwebtoken')
const { secret } = require('../config/envExport')

const registerAdmin = async(data) => {
    const emailCheck = await adminSchema.find({ email: data.email })
    if (emailCheck.length > 0) return { success: false, msg: 'Email is already taken' }
    const prepareAdmin = new adminSchema(data)
    return await prepareAdmin.save().then(newAdmin => {
        return { success: true, msg: 'Admin Registered', data: newAdmin }
    }).catch(err => {
        return { success: false, msg: err.message }
    })
}

const loginAdmin = async(data) => {
    const checkData = await adminSchema.find({ email: data.email }, { email: true, password: true })
    if (checkData.length == 0) return { success: false, msg: 'Email is invalid' }
    const passCheck = await compare(data.password, checkData[0].password)
    if (!passCheck) return { success: false, msg: 'Password is invalid' }
    const getData = await adminSchema.findOne({ email: data.email }, { password: false })
    return { success: true, msg: 'Logged in', data: getData }
}

const validateAdmin = async(req, res, next) => {
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
            var user = await adminSchema.findById(confirmation.id)
            if (user.length == 0) retError += 'You are not authorized.'
        }
    }
    if (retError.length != 0) res.json({ success: false, msg: retError })
    else next()
}

module.exports = {
    registerAdmin,
    loginAdmin,
    validateAdmin
}