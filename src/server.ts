import express from 'express'
import path from 'path'
import socketio from 'socket.io'
import http from 'http'

import IoEvents from './IoEvents'

const clientPath = path.resolve(__dirname, 'client')

const app = express()
app.use(express.static(clientPath))

const server = http.createServer(app)

const io = socketio(server)

io.on('connection', socket => new IoEvents(io, socket))

server.listen(3000, () => console.log('Server listening on 3000'))
