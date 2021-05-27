const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Users = require('../model/Users')
const { secret } = require('../config/envExport')
const { validateUser } = require('../util/userFunctions')
const { registerUser, login } = require('../util/userFunctions')

router.post('/register', async(req, res) => {
    var response = await registerUser(req.body)
    res.json(response)
})

router.post('/login', async(req, res) => {
    var response = await login(req.body)
    if (response.success) {
        var token = 'Bearer ' + jwt.sign({ id: response.user._id }, secret, { expiresIn: 24 * 60 * 60 })
        res.json({...response, token })
    } else {
        res.json(response)
    }
})

router.get('/', validateUser, async(req, res) => {
    var users = await Users.find();
    res.json({ success: true, users })
})

module.exports = router