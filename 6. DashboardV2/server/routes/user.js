const router = require('express').Router()
const userSchema = require('../model/User')
const { registerUser, loginUser, validateUser } = require('../functions/userFunctions')
const { sign } = require('jsonwebtoken')
const { secret } = require('../config/envExport')
const { returnFromBody } = require('../functions/globalFunctions')
const { getAllProducts } = require('../functions/productFunctions')

router.post('/register', async(req, res) => {
    let retObject = returnFromBody(['userName', 'number', 'email', 'password'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { userName, number, email, password } = retObject.data
        const response = await registerUser({ userName, number, email, password })
        res.json(response)
    }
})

router.post('/login', async(req, res) => {
    let retObject = returnFromBody(['email', 'password'], req.body)
    if (!retObject.success) {
        res.json({ success: false, msg: retObject.data + ' is Required' })
    } else {
        const { email, password } = retObject.data
        const response = await loginUser({ email, password })
        if (response.success) {
            var token = 'Bearer ' + sign({ id: response.data._id }, secret, { expiresIn: 24 * 60 * 60 })
            res.json({...response, token })
        } else {
            res.json(response)
        }
    }
})

router.post('/listProducts', validateUser, async(req, res) => {
    res.json(await getAllProducts())
})

module.exports = router