const mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({

    uid: {
        type: String,
        default: "",

    },
    uname: {
        type: String,
        require: true,
    },
    unumber: {
        type: Number,
        require: true,
    },
    uemail: {
        type: String,
        require: true,
    },

    pid: {
        type: String,
        default: "",
    },
    pname: {
        type: String,
        default: "",
    },
    psku: {
        type: String,
        default: ""
    },
    pcategories: {
        type: String,
        default: ""
    },
    ptags: {
        type: String,
    },
    pdescription: {
        type: String,
    },

    paymentMethod: {
        type: String,
        default: "",
    },
    total: {
        type: Number,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    },
})






var ProductSchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    sku: {
        type: String,
        default: ""
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
        default: ""
    },
    date: {
        type: Date,
        default: Date.now,

    },
    tags: {
        type: String,
    },
    description: {
        type: String,
    },

})





var UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    number: {
        type: Number,
        require: true,
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    totalOrders: {
        type: Number,
        default: "0",
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const schema = {
    order: mongoose.model('Order', OrderSchema),
    product: mongoose.model('Product', ProductSchema),
    user: mongoose.model('User', UserSchema)
}
module.exports = schema