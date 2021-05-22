const express = require('express')
const schema = require('../models/schemas')
const bcrypt = require('bcrypt');
const router = express.Router()

const saltRounds = 10;
const adminTempPassword = '$2b$10$ZrvcN2.iJc/BsXmDfmCQVOVZS7rtwxBoMQoq3izDl///Mp2otdl7.'; // abcdefghi


router.get('/', (req, res) => {
    res.json({ success: true, msg: "User Route" })
})

router.post('/getAll', async (req, res) => {
    let response = await schema.user.find({}, { password: 0 })
    var message = response.length + ' Users found'
    res.json({ success: true, msg: message, data: response })
})

router.post('/register', async (req, res) => {

    let { name, number, email, password } = req.body;
    if ((!name) || (!(name.trim()).length))
        res.json({ success: false, msg: "Name is required" })
    else if ((!number) || (!(number.trim()).length))
        res.json({ success: false, msg: "Number is required" })
    else if ((!email) || (!(email.trim()).length))
        res.json({ success: false, msg: "Email is required" })
    else if ((!password) || ((password.trim()).length < 8))
        res.json({ success: false, msg: "Password must be greater than 8 characters" })

    else {
        password = await bcrypt.hash(password, saltRounds)



        schema.user.findOne({ email: email }).then(async (response) => {
            if (response) {
                res.json({ success: false, msg: "User Already Exist." })
            } else {
                var data = {
                    name: name,
                    number: number,
                    email: email,
                    password: password
                }
                await schema.user.create(data, (err, response) => {
                    if (err) res.json({ success: false, msg: err.message })
                    else if (response) res.json({ success: true, msg: "User Register Successfully", data: { _id: response._id } })
                    else res.json({ success: false, msg: "Internal Server Error" })
                })
            }
        }).catch(err => {
            res.json({ success: false, msg: err.message })
        })
    }
})


router.post('/searchUser', async (req, res) => {
    var { _id } = req.body
    if ((!_id) || (!(_id.trim()).length))
        res.json({ success: false, msg: "_id is required" })
    else {
        schema.user.findById(_id, { password: 0 }).then(async response => {
            if (response) {
                res.json({ success: true, msg: "User Found.", data: response })
            } else {
                res.json({ success: false, msg: "No User Found." })
            }
        }).catch(err => {
            res.json({ success: false, msg: err.message })
        })
    }
})

router.post('/deleteUser', async (req, res) => {

    var { _id, password } = req.body
    if ((!_id) || (!(_id.trim()).length))
        res.json({ success: false, msg: "_id is required." })

    else if ((!password) || ((password.trim()).length < 8))
        res.json({ success: false, msg: "Password must be greater than 8 characters" })

    else {

        schema.user.findById(_id, { password: 1 }).then(async response => {
            if (response) {
                if (await bcrypt.compare(password, response.password)) {
                    schema.user.findByIdAndDelete(_id).then(async response => {
                        res.json({ success: true, msg: "User Successfully Deleted", data: response })

                    }).catch(err => {
                        res.json({ success: false, msg: err.message })
                    })
                }
                else {
                    res.json({ success: false, msg: 'Invalid Password' })
                }
            } else {
                res.json({ success: false, msg: "No User Found With This ID." })
            }
        }).catch(err => {
            res.json({ success: false, msg: err.message })
        })



    }
})

router.post('/deleteUserV2', async (req, res) => {

    var { _id, password } = req.body
    if ((!_id) || (!(_id.trim()).length))
        res.json({ success: false, msg: "_id is required." })

    else if ((!password) || ((password.trim()).length < 8))
        res.json({ success: false, msg: "Password must be greater than 8 characters" })

    else {

        schema.user.findById(_id, { password: 1 }).then(async response => {
            if (response) {
                if (await bcrypt.compare(password, adminTempPassword)) {
                    schema.user.findByIdAndDelete(_id).then(async response => {
                        res.json({ success: true, msg: "User Successfully Deleted", data: response })

                    }).catch(err => {
                        res.json({ success: false, msg: err.message })
                    })
                }
                else {
                    res.json({ success: false, msg: 'Invalid Password' })
                }
            } else {
                res.json({ success: false, msg: "No User Found With This ID." })
            }
        }).catch(err => {
            res.json({ success: false, msg: err.message })
        })



    }
})

module.exports = router