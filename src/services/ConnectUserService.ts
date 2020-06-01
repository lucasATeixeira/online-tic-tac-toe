import ConnectionsRepository from '../repositories/ConnectionsRepository'
import { Server } from 'socket.io'


export default class ConnectUserService {
  execute(socketId: string, io: Server, connectionsRepository: ConnectionsRepository) {
    const connections = connectionsRepository.getConnections()
    let { player1, player2, guests } = connections

    if (!player1) {
      player1 = connectionsRepository.setPlayer1(socketId)
      io.to(socketId).emit('user-status', 'player1')
    } else if (!player2) {
      player2 = connectionsRepository.setPlayer2(socketId)
      io.to(socketId).emit('user-status', 'player2')
    } else {
      guests = connectionsRepository.setGuests([...guests, socketId])
      io.to(socketId).emit('user-status', `guest${guests.length}`)
    }

    io.emit('connected-users', guests.length + Number(!!player1) + Number(!!player2))
  }
}
