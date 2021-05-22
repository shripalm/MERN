const express = require('express')
const schema = require('../models/schemas')
const router = express.Router()
const bcrypt = require('bcrypt');

const saltRounds = 10;
const adminTempPassword = '$2b$10$ZrvcN2.iJc/BsXmDfmCQVOVZS7rtwxBoMQoq3izDl///Mp2otdl7.'; // abcdefghi

router.get('/', (req, res) => {
    res.json({ success: true, msg: "Order Route" })
})

router.post('/getAll', async (req, res) => {
    let response = await schema.order.find()
    var message = response.length + ' Order found'
    res.json({ success: true, msg: message, data: response })
})

router.post('/addOrder', async (req, res) => {

    let { uid, pid, paymentMethod, total } = req.body;
    if ((!uid) || (!(uid.trim()).length))
        res.json({ success: false, msg: "UID is required" })
    else if ((!pid) || (!(pid.trim()).length))
        res.json({ success: false, msg: "PID is required" })
    else if ((!paymentMethod) || (!(paymentMethod.trim()).length))
        res.json({ success: false, msg: "Payment Method is required" })
    else if ((!total) || (!(total.trim()).length))
        res.json({ success: false, msg: "Total is required" })

    else {

        schema.product.findById(pid).then(async (prodResponse)=>{
            if (prodResponse) {
                if(prodResponse.stock < 1) res.json({ success: false, msg: "Out of Stock." })
                else{

                    schema.user.findById(uid).then(async (userResponse)=>{
                        if (userResponse) {
                            
                            var data = {
                                uid: uid,
                                uname: userResponse.name,
                                uemail: userResponse.email,
                                unumber: userResponse.number,
                                pid: pid,
                                pname: prodResponse.name,
                                psku: prodResponse.sku,
                                pcategories: prodResponse.categories,
                                ptags: prodResponse.tags,
                                pdescription: prodResponse.description,
                                paymentMethod: paymentMethod,
                                total: total
                            }
                            await schema.order.create(data, (err, orderResponse) => {
                                if (err) res.json({ success: false, msg: err.message })
                                else if (orderResponse){
                                    schema.product.findByIdAndUpdate({_id:pid},{stock:(parseInt(prodResponse.stock) - 1)}).then(async temp => {
                                        schema.user.findByIdAndUpdate({_id:uid},{totalOrders:(parseInt(userResponse.totalOrders) + 1)}).then(async temp => {
                                            res.json({ success: true, msg: "Order Created Successfully", data: orderResponse })
                                        }).catch(err => {
                                            res.json({ success: false, msg: '1'+err.message })
                                        })
                                    }).catch(err => {
                                        res.json({ success: false, msg: '2'+err.message })
                                    })
                                }
                                else res.json({ success: false, msg: "Internal Server Error" })
                            })

                        } else {
                            res.json({ success: false, msg: "Invalid User." })
                        }
                    }).catch(err => {
                        res.json({ success: false, msg: '3'+err.message })
                    })
                }
            } else {
                res.json({ success: false, msg: "Invalid Found." })
            }
        }).catch(err => {
            res.json({ success: false, msg: '4'+err.message })
        })

    }
})


router.post('/orderById', async (req, res) => {
    var { _id } = req.body
    if ((!_id) || (!(_id.trim()).length))
        res.json({ success: false, msg: "_id is required" })
    else {
        schema.order.findById(_id).then(async response => {
            if (response) {
                res.json({ success: true, msg: "Order Found.", data: response })
            } else {
                res.json({ success: false, msg: "Order Not Found." })
            }
        }).catch(err => {
            res.json({ success: false, msg: err.message })
        })
    }
})

module.exports = router