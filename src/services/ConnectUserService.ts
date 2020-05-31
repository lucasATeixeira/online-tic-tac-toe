import ConnectionsRepository from '../repositories/ConnectionsRepository'
import { Server } from 'socket.io'


export default class ConnectUserService {
  execute(socketId: string, connectionsRepository: ConnectionsRepository, io: Server) {
    const connections = connectionsRepository.getConnections()
    const { player1, player2, guests } = connections

    if (!player1) {
      connectionsRepository.setPlayer1(socketId)
      io.to(socketId).emit('user-status', 'player1')
    } else if (!player2) {
      connectionsRepository.setPlayer2(socketId)
      io.to(socketId).emit('user-status', 'player2')
    } else {
      guests.push(socketId)
      connectionsRepository.setGuests(guests)
      io.to(socketId).emit('user-status', `guest${guests.length}`)
    }
  }
}
