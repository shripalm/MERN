const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_task"
})

dbConn.connect((dbErr) => {
    if (dbErr) console.log(dbErr);
    else app.listen(5000, (err) => { console.log(err || 'Listining') })
})

app.use(bodyParser.json());

function response(res, code, message) {
    res.json({
        "code": code,
        "message": message
    })
    res.end();
}

app.post('/registration', (req, res) => {
    const { firstname, lastname, email, password } = req.body
    dbConn.query(`select *from userdata where email='${email}'`, (queryErr, result, fields) => {
        if (queryErr) console.log(queryErr);
        else {
            if (result.length > 0) response(res, 400, "Dummy record");
            else {
                dbConn.query(`INSERT INTO userdata( firstname, lastname, email, password) VALUES ('${firstname}','${lastname}','${email}','${password}')`, (queryErr) => {
                    if (queryErr) console.log(queryErr);
                    else response(res, 200, "Success");
                })
            }
        }
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    dbConn.query(`select *from userdata where email='${email}'`, (queryErr, result, fields) => {
        if (queryErr) console.log(queryErr);
        else {
            if (result.length == 0) response(res, 400, "Email not registered");
            else {
                dbConn.query(`select *from userdata where email='${email}' AND password='${password}'`, (queryErr, result, fields) => {
                    if (queryErr) console.log(queryErr);
                    else {
                        if (result.length == 0) response(res, 400, "Email and password is invalid");
                        else response(res, 200, { 'id': result[0].id });

                    }
                })
            }
        }
    })
})

app.get('/getData/:id', (req, res) => {
    // if (!req.body.id) response(res, 400, "Enter Id");
    const { id } = req.params
    dbConn.query(`select *from userdata where id=${id}`, (queryErr, result, fields) => {
        if (queryErr) console.log(queryErr);
        else {
            if (result.length == 0) response(res, 400, "Not valid id");
            else response(res, 200, result[0]);
        }
    })
})