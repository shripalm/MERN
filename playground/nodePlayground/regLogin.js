const app = require('express')()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const PORT = 5000

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.json())

const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_task"
})

dbConn.connect((dbErr) => {
    if (dbErr) console.log(dbErr);
    else app.listen(PORT, (err) => { console.log(err || 'Listining') })
})

function response(res, code, message) {
    res.json({
        "success": code,
        "msg": message
    })
    // res.end()
}

app.post('/registration', (req, res) => {
    const { firstname, lastname, email, password } = req.body
    if(password.length<8) response(res, false, "Password must be greater than 8 characters")
    else{
        dbConn.query(`select *from userdata where email='${email}'`, (queryErr, result, fields) => {
            if (queryErr) console.log(queryErr)
            else {
                if (result.length > 0) response(res, false, "Email is already in use")
                else {
                    dbConn.query(`INSERT INTO userdata( firstname, lastname, email, password) VALUES ('${firstname}','${lastname}','${email}','${password}')`, (queryErr) => {
                        if (queryErr) console.log(queryErr)
                        else response(res, true, "Registration successful")
                    })
                }
            }
        })
    }
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    if(password.length<8) response(res, false, "Password must be greater than 8 characters")
    else{
        dbConn.query(`select *from userdata where email='${email}'`, (queryErr, result, fields) => {
            if (queryErr) console.log(queryErr)
            else {
                if (result.length == 0) response(res, false, "Email not registered")
                else {
                    dbConn.query(`select *from userdata where email='${email}' AND password='${password}'`, (queryErr, result, fields) => {
                        if (queryErr) console.log(queryErr)
                        else {
                            if (result.length == 0) response(res, false, "Email and password is invalid")
                            else response(res, true, { 'id': result[0].id });
                            
                        }
                    })
                }
            }
        })
    }
})

app.get('/getData/:id', (req, res) => {
    const { id } = req.params
    dbConn.query(`select firstname,lastname,regdate,email from userdata where id=${id}`, (queryErr, result, fields) => {
        if (queryErr) console.log(queryErr)
        else {
            if (result.length == 0) response(res, false, "Not valid id")
            else response(res, true, result[0])
        }
    })
})