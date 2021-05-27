const userSchema = require('../model/User')
const { compare } = require('bcrypt')
const { verify } = require('jsonwebtoken')
const { secret } = require('../config/envExport')

const registerUser = async(data) => {
    const emailCheck = await userSchema.find({ email: data.email })
    if (emailCheck.length > 0) return { success: false, msg: 'Email is already taken' }
    const prepareUser = new userSchema(data)
    return await prepareUser.save().then(newUser => {
        return { success: true, msg: 'User Registered', data: newUser }
    }).catch(err => {
        return { success: false, msg: err.message }
    })
}

const loginUser = async(data) => {
    const checkData = await userSchema.find({ email: data.email }, { email: true, password: true })
    if (checkData.length == 0) return { success: false, msg: 'Email is invalid' }
    const passCheck = await compare(data.password, checkData[0].password)
    if (!passCheck) return { success: false, msg: 'Password is invalid' }
    const getData = await userSchema.findOne({ email: data.email }, { password: false })
    return { success: true, msg: 'Logged in', data: getData }
}

const validateUser = async(req, res, next) => {
    let bearerToken = req.headers.authorization.split(" ")[1];
    var confirmation = verify(bearerToken, secret)
    var user = await userSchema.findById(confirmation.id)
    if (user.length == 0) res.json({ success: false, msg: "You are not authorized." })
    next()
}

module.exports = {
    registerUser,
    loginUser,
    validateUser
}