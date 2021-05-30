const router = require('express').Router()
const sellerSchema = require('../model/Seller')
const { registerSeller, loginSeller, validateSeller } = require('../functions/sellerFunctions')
const { sign } = require('jsonwebtoken')
const { secret } = require('../config/envExport')
const { returnFromBody, tokenToId } = require('../functions/globalFunctions')
const { addProducts, viewProductBySID, deleteProducts } = require('../functions/productFunctions')
const { getOrderOfSeller } = require('../functions/orderFunctions')

router.post('/register', async(req, res) => {
    let retObject = returnFromBody(['userName', 'email', 'password'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { userName, email, password } = retObject.data
        const response = await registerSeller({ userName, email, password })
        res.json(response)
    }
})

router.post('/login', async(req, res) => {
    let retObject = returnFromBody(['email', 'password'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { email, password } = retObject.data
        const response = await loginSeller({ email, password })
        if (response.success) {
            var token = 'Bearer ' + sign({ id: response.data._id }, secret, { expiresIn: 24 * 60 * 60 })
            res.json({...response, token })
        } else {
            res.json(response)
        }
    }
})

router.post('/addProducts', validateSeller, async(req, res) => {
    let retObject = returnFromBody(['name', 'sku', 'stock', 'price', 'categories', 'tags', 'description'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { name, sku, stock, price, categories, tags, description } = retObject.data
        const sellerID = tokenToId(req)
        res.json(await addProducts({ name, sku, stock, price, categories, tags, description, sellerID }))
    }
})

router.post('/viewProducts', validateSeller, async(req, res) => {
    res.json(await viewProductBySID(tokenToId(req)))
})

router.post('/deleteProducts', validateSeller, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await deleteProducts(_id))
    }
})

router.post('/viewMyOrders', validateSeller, async(req, res) => {
    res.json(await getOrderOfSeller(tokenToId(req)))
})

module.exports = router