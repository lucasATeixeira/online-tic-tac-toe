import { Server } from 'socket.io'
import ConnectionsRepository from './repositories/ConnectionsRepository'
import ConnectUserService from './services/ConnectUserService'
import DisconnectUserService from './services/DisconnectUserService'

const connectionsRepository = new ConnectionsRepository()

export default function ioEvents(io: Server): void {
  io.on('connection', socket => {
    const socketId = socket.id
    const connectUser = new ConnectUserService()
    connectUser.execute(socketId, connectionsRepository, io)

    socket.on('disconnect', () => {
      const disconnectUser = new DisconnectUserService()
      disconnectUser.execute(socketId, connectionsRepository, io)
    })
  })
}
