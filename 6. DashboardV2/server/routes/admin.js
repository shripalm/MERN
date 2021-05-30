const router = require('express').Router()
const { registerAdmin, loginAdmin, validateAdmin } = require('../functions/adminFunctions')
const { sign } = require('jsonwebtoken')
const { secret } = require('../config/envExport')
const { returnFromBody } = require('../functions/globalFunctions')
const { getAllProducts, getProductById, viewProductBySID } = require('../functions/productFunctions')
const { deleteUser, getAllUsers, getUserDetails } = require('../functions/userFunctions')
const { getAllSellers, getSellerById } = require('../functions/sellerFunctions')
const { getAllOrders, getOrderById, getOrderOfSeller, getOrderOfUser } = require('../functions/orderFunctions')

router.post('/register', async(req, res) => {
    let retObject = returnFromBody(['email', 'password'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { email, password } = retObject.data
        const response = await registerAdmin({ email, password })
        res.json(response)
    }
})

router.post('/login', async(req, res) => {
    let retObject = returnFromBody(['email', 'password'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { email, password } = retObject.data
        const response = await loginAdmin({ email, password })
        if (response.success) {
            var token = 'Bearer ' + sign({ id: response.data._id }, secret, { expiresIn: 24 * 60 * 60 })
            res.json({...response, token })
        } else {
            res.json(response)
        }
    }
})

router.post('/listProducts', validateAdmin, async(req, res) => {
    res.json(await getAllProducts())
})

router.post('/deleteUser', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await deleteUser(_id))
    }
})

router.post('/listOrders', validateAdmin, async(req, res) => {
    res.json(await getAllOrders())
})

router.post('/orderById', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await getOrderById(_id))
    }
})

router.post('/orderBySID', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await getOrderOfSeller(_id))
    }
})

router.post('/orderByUID', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await getOrderOfUser(_id))
    }
})

router.post('/productById', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await getProductById(_id))
    }
})

router.post('/productBySID', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await viewProductBySID(_id))
    }
})

router.post('/listSellers', validateAdmin, async(req, res) => {
    res.json(await getAllSellers())
})

router.post('/sellerById', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await getSellerById(_id))
    }
})

router.post('/listUsers', validateAdmin, async(req, res) => {
    res.json(await getAllUsers())
})

router.post('/userById', validateAdmin, async(req, res) => {
    let retObject = returnFromBody(['_id'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { _id } = retObject.data
        res.json(await getUserDetails(_id))
    }
})

module.exports = router