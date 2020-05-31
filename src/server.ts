import express from 'express'
import path from 'path'
import socketio from 'socket.io'
import http from 'http'

import ioEvents from './ioEvents'

const clientPath = path.resolve(__dirname, 'client')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

ioEvents(io)

app.use(express.static(clientPath))

server.listen(3000, () => console.log('Server listening on 3000'))
