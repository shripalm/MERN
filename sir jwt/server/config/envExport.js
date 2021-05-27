require('dotenv').config()


module.exports = {
    port: process.env.PORT,
    dbString: process.env.DBSTRING,
    secret: process.env.SECRET
}