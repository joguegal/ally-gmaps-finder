module.exports = (server) => {
    const controller = require('../controller/controller')

    server.route('/api/getAddress/:address')
          .get(controller.getCoordinates)
}