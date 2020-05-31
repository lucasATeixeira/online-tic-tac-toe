import ConnectionsRepository from '../repositories/ConnectionsRepository'
import { Server } from 'socket.io'

export default class DisconnectUserService {
  execute(socketId: string, connectionsRepository: ConnectionsRepository, io: Server) {
    const connections = connectionsRepository.getConnections()
    let { player1, player2, guests } = connections

      if (socketId === player1) {
        player1 = connectionsRepository.setPlayer1(guests[0] || null)
        if (guests[0]) {
          io.to(guests[0]).emit('user-status', 'player1')
          guests = connectionsRepository.setGuests(guests.slice(1))
        }
      }

      if (socketId === player2) {
        player2 = connectionsRepository.setPlayer2(guests[0] || null)
        if (guests[0]) {
          io.to(guests[0]).emit('user-status', 'player2')
          guests = connectionsRepository.setGuests(guests.slice(1))
        }
      }

      if (socketId !== player1 && socketId !== player2) {
        guests = connectionsRepository.setGuests(guests.filter(guest => guest !== socketId))
      }

      guests.forEach((guest, index) => io.to(guest).emit('user-status', `guest${index + 1}`))
      io.emit('connected-users', guests.length + Number(!!player1) + Number(!!player2))
  }
}
