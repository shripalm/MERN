const { Schema, model } = require("mongoose")

var orderSchema = Schema({

    uID: {
        type: String,
        required: true,
    },
    uName: {
        type: String,
        required: true,
    },
    uNumber: {
        type: Number,
        required: true,
    },
    uEmail: {
        type: String,
        required: true,
    },

    sID: {
        type: String,
        required: true,
    },

    pID: {
        type: String,
        required: true,
    },
    pName: {
        type: String,
        required: true,
    },
    pSKU: {
        type: String,
        required: true,
    },
    pCategories: {
        type: String,
        required: true,
    },
    pTags: {
        type: String,
        required: true,
    },
    pDescription: {
        type: String,
        required: true,
    },

    paymentMethod: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,

    }
}, {
    timestamps: true
})

module.exports = model('orders', orderSchema)