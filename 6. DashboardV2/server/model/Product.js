const { Schema, model } = require("mongoose")

var productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: "0"
    },
    price: {
        type: Number,
        default: "0",
    },
    categories: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sellerID:{
        type:String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Product', productSchema)