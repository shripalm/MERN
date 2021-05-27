require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    requestFrom: process.env.REQUEST_FROM,
    dbString: process.env.DB_STRING,
    secret: process.env.SECRET
}