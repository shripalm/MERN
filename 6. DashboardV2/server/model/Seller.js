const { Schema, model } = require('mongoose')
const { hash } = require('bcrypt')

const sellerSchema = new Schema({
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
    totalProducts: {
        type: Number,
        default: "0",
    }
}, {
    timestamps: true
})

sellerSchema.pre('save', async function(next) {
    this.password = await hash(this.password, 10)
    next()
})

module.exports = model('sellers', sellerSchema)