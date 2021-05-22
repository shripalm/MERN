const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors');
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const mongoose = require('mongoose');

const PORT = 5000
const mongoString = 'mongodb://localhost:27017/dashboard'
const corsOptions = {origin: 'http://localhost:3000'}
const mongoOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/order', orderRoute)

mongoose.connect(mongoString, mongoOption, (err) => {
    if (err) console.log(err);
    else { app.listen(PORT, (err) => { console.log(err || "listening on port " + PORT) }) }
});

app.get('/', (req, res) => {
    res.json({ success: true, msg: "Server is up and running"})
})