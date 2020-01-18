const request = require('request')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.getCoordinates = (req, res) => {
    const providedAddress = req.params.address
    const gmapsAddress = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + providedAddress + '&key=AIzaSyCuMb6qZn-VHbKdW-Wmw5ykmM0mFGpFPsY'
    getAddressGMaps(gmapsAddress, json => {
        res.send(json)
    })
}

getAddressGMaps = (address, json) => {
    request({
        url: address,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            //const address = body.results[0]['formatted_address']
            const lat = body.results[0]['geometry']['location'].lat
            const lng = body.results[0]['geometry']['location'].lng
            const numberStreet = body.results[0]['address_components'][0].long_name
            const street = body.results[0]['address_components'][1].long_name
            const city = body.results[0]['address_components'][3].long_name
            json({ street: street, number: numberStreet, city: city, latitude: lat, longitude: lng })
        }
    })
}

exports.getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(404).json(err)
        res.json(users)
    }).select({ _id: 0 })
}

exports.saveUser = (req, res) => {
    const user = req.body
    User.create(user, (err, docs) => {
        if (err) res.status(500).json(err)
        res.status(201).json(docs)
    })
}
