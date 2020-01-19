const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./api/model/User')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://gmaps-mongo/dbAddresses', { useNewUrlParser: true, useUnifiedTopology: true })

const routes = require('./api/routing/routes')
routes(app)
const port = process.env.PORT || 8080

const server = app.listen(port, () => {
    const host = server.address().address
    console.log(`Server opened at http://${host}:${port}`)
})

