const { Schema, model } = require('mongoose')
const { hash } = require('bcrypt')

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        require: true,
    },
    totalOrders: {
        type: Number,
        default: "0",
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    this.password = await hash(this.password, 10)
    next()
})

module.exports = model('users', userSchema)