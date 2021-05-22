const express = require('express')
const schema = require('../models/schemas')
const router = express.Router()
const bcrypt = require('bcrypt');

const saltRounds = 10;
const adminTempPassword = '$2b$10$ZrvcN2.iJc/BsXmDfmCQVOVZS7rtwxBoMQoq3izDl///Mp2otdl7.'; // abcdefghi


router.get('/', (req, res) => {
    res.json({ success: true, msg: "Product Route" })
})




router.post('/getAll', async (req, res) => {
    let response = await schema.product.find()
    var message = response.length + ' Product found'
    res.json({ success: true, msg: message, data: response })
})

router.post('/addItem', async (req, res) => {

    let { name, sku, stock, price, categories, tags, description } = req.body;
    if ((!name) || (!(name.trim()).length))
        res.json({ success: false, msg: "Name is required" })
    else if ((!sku) || (!(sku.trim()).length))
        res.json({ success: false, msg: "SKU is required" })
    else if ((!stock) || (!(stock.trim()).length))
        res.json({ success: false, msg: "Stock is required" })
    else if ((!price) || (!(price.trim()).length))
        res.json({ success: false, msg: "Price is required" })
    else if ((!tags) || (!tags.length))
        res.json({ success: false, msg: "Price is required in array" })
    else if ((!categories) || (!(categories.trim()).length))
        res.json({ success: false, msg: "Categories is required" })
    else if ((!description) || (!(description.trim()).length))
        res.json({ success: false, msg: "Description is required" })

    else {
        var data = {
            name: name,
            sku: sku,
            stock: stock,
            price: price,
            categories: categories,
            tags: tags,
            description: description
        }
        await schema.product.create(data, (err, response) => {
            if (err) res.json({ success: false, msg: err.message })
            else if (response) res.json({ success: true, msg: "Product Created Successfully", data: response })
            else res.json({ success: false, msg: "Internal Server Error" })
        })
    }
})


router.post('/productById', async (req, res) => {
    var { _id } = req.body
    if ((!_id) || (!(_id.trim()).length))
        res.json({ success: false, msg: "_id is required" })
    else {
        schema.product.findById(_id).then(async response => {
            if (response) {
                res.json({ success: true, msg: "Product Found.", data: response })
            } else {
                res.json({ success: false, msg: "No Product Found." })
            }
        }).catch(err => {
            res.json({ success: false, msg: err.message })
        })
    }
})

router.post('/deleteProduct', async (req, res) => {

    var { _id, password } = req.body
    if ((!_id) || (!(_id.trim()).length))
        res.json({ success: false, msg: "_id is required." })

    else if ((!password) || ((password.trim()).length < 8))
        res.json({ success: false, msg: "Password must be greater than 8 characters" })

    else {

        schema.product.findById(_id).then(async response => {
            if (response) {
                if (await bcrypt.compare(password, adminTempPassword)) {
                    schema.product.findByIdAndDelete(_id).then(async response => {
                        res.json({ success: true, msg: "Product Successfully Deleted", data: response })

                    }).catch(err => {
                        res.json({ success: false, msg: err.message })
                    })
                }
                else {
                    res.json({ success: false, msg: 'Invalid Password' })
                }
            } else {
                res.json({ success: false, msg: "No Product Found With This ID." })
            }
        }).catch(err => {
            res.json({ success: false, msg: err.message })
        })



    }
})



module.exports = router