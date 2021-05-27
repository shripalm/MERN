const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const UsersSchema = new Schema({

    userName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

UsersSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
})


module.exports = model('Users', UsersSchema)