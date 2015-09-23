(() => {
    'use strict';
    var express = require('express'),
        path = require('path'),
        morgan = require('morgan')

    const STATIC_BASE = process.env.STATIC_BASE || path.join(__dirname, 'dist')
    const LISTEN_PORT = parseInt(process.env.PORT) || 5000
    const LISTEN_HOST = process.env.HOST || null

    let server = express()

    server.use(express.static(STATIC_BASE))
    server.use(morgan('short'))

    server.get('*', function (req, res) {
        res.sendFile(path.join(STATIC_BASE, 'index.html'));
    })

    server.listen(LISTEN_PORT, LISTEN_HOST, function () {
        console.log(`Listening on ${LISTEN_HOST || '*'}:${LISTEN_PORT}`)
    })
})()
