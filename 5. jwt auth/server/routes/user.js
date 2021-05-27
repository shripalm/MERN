const router = require('express').Router()
const userSchema = require('../model/User')
const { registerUser, loginUser, validateUser } = require('../functions/userFunctions')
const { sign } = require('jsonwebtoken')
const { secret } = require('../config/envExport')

router.get('/', (req, res) => {
    res.json({ success: true, msg: 'User router is up' })
})

router.post('/register', async(req, res) => {
    const { userName, email, password } = req.body
    const response = await registerUser({ userName, email, password })
    res.json(response)
})

router.post('/login', async(req, res) => {
    const { email, password } = req.body
    const response = await loginUser({ email, password })
    if (response.success) {
        var token = 'Bearer ' + sign({ id: response.data._id }, secret, { expiresIn: 24 * 60 * 60 })
        res.json({...response, token })
    } else {
        res.json(response)
    }
})

router.post('/', validateUser, async(req, res) => {
    const data = await userSchema.find()
    res.json({ success: true, msg: data.length + ' Users found', data: data })
})

module.exports = router