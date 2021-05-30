const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const { connect } = require('mongoose')
const { port, requestFrom, dbString } = require('./config/envExport')

const corsOption = { origin: requestFrom }
const mongoOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOption))


const initFunction = async function() {
    await new connect(dbString, mongoOption).then(() => {
        app.listen(port, err => {
            console.log((err ? err : 'Listing on port: ' + port))
        })
    }).catch(err => {
        console.log(err.message)
    })
}();


app.get('/', (req, res) => {
    res.json({ success: true, msg: 'Server is up' })
})

app.use('/api/user', require('./routes/user'))

app.use('/api/admin', require('./routes/admin'))

app.use('/api/seller', require('./routes/seller'))