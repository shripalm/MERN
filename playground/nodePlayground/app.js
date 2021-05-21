const express = require('express')
const app = express()
app.listen(5000, (err) => { console.log(err || 'Listining') })
app.get('/', (req, res) => {
    console.log('Got get')
    res.send('Get Called')
    res.end();
})
app.post('/', (req, res) => {
    console.log('Got post')
    res.send('Post Called')
    res.end();
})
app.put('/', (req, res) => {
    console.log('Got put')
    res.send('Put Called')
    res.end();
})
app.delete('/', (req, res) => {
    console.log('Got delete')
    res.send('Delete Called')
    res.end();
})