const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors');
const { success, error } = require('consola')
const { connect } = require('mongoose');
const { dbString, port } = require('./config/envExport')


const corsOptions = { origin: 'http://localhost:3000' } // cors option


const mongoOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}


// Applying Middle wares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))


initFunction()

async function initFunction() {
    await connect(dbString, mongoOption).then(() => {
        app.listen(port, (err) => {
            err ? error({ message: err, badge: true }) : success({ message: "connected to database and running server", badge: true })
        })
    }).catch(err => {
        error({ message: err, badge: true })
    })
}



//routes
app.use('/api/users', require('./routes/user'))
