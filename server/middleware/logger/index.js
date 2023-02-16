const fs = require('fs');
const os = require('os');

module.exports = (req, res, next) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const now = new Date()
    const normalFormat = now.toLocaleDateString("ru-RU", options)
    const {url, method} = req

    const data = `${normalFormat}: ${method} - ${url}`

    fs.appendFile('./server/utils/logs/server.logs', data + os.EOL, (err) => {
        if (err) throw err;
    })

    next()
}