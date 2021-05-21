const mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        default: "",
    }
})

var User = mongoose.model('User', UserSchema)

module.exports = User