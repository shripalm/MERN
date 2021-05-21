const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const users = require('./routes/users')


var PORT = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:3000' }))

app.use('/users', users)

var mongoOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect('mongodb://localhost:27017/test', mongoOption, (err) => {
    if (err) console.log(err);
    else { app.listen(PORT, (err) => { console.log(err || "listening on port " + PORT) }) }
});

app.get('/', (req, res) => {
    res.send("server is up and running.")
})