const { verify } = require('jsonwebtoken')
const Users = require('../model/Users')
const bcrypt = require('bcrypt')
const { secret } = require('../config/envExport')


const registerUser = async (data) => {
    var user = new Users(data)
    return await user.save().then(newUser => {
        return { msg: "User Created Successfully", user: newUser, success: true }
    }).catch(err => {
        return { msg: err.message, success: false }
    })
}

const login = async (data) => {
    var { email, password } = data
    var user = await Users.find({ email: email })
    if (user.length == 0) {
        return { msg: "Invalid password or email", success: false }
    }
    else {
        var validate = await bcrypt.compare(password, user[0].password)
        if (validate) {
            return { msg: "User Successfully Logged In", user: user[0], success: true }
        }
        return { msg: "Invalid password", success: false }
    }
}

const validateUser = async (req, res, next) => {
    let bearerToken = req.headers.authorization.split(" ")[1];
    var confirmation = verify(bearerToken, secret)

    var user = await Users.findById(confirmation.id)

    if (user.length == 0) {
        res.json({ msg: "You are not authorized.", success: false })
    }
    else {
        next()
    }
}




module.exports = {
    registerUser,
    login,
    validateUser
}