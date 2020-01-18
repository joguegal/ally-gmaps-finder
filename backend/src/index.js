const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://172.17.0.2/dbAdresses', { useNewUrlParser : true, useUnifiedTopology: true })

const port = process.env.PORT || 6000

const server = app.listen(port, () => {
    const host = server.address().address
    console.log(`Server opened at http://${host}:${port}`)
})
