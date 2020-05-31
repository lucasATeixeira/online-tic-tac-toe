import ConnectionsRepository from '../repositories/ConnectionsRepository'
import { Server } from 'socket.io'

export default class DisconnectUserService {
  execute(socketId: string, connectionsRepository: ConnectionsRepository, io: Server) {
    const connections = connectionsRepository.getConnections()
    let { player1, player2, guests } = connections

      if (socketId === player1) {
        connectionsRepository.setPlayer1(guests[0] || null)
        if (guests[0]) {
          io.to(guests[0]).emit('user-status', 'player1')
          guests.shift()
          connectionsRepository.setGuests(guests)
        }
      }
      if (socketId === player2) {
        connectionsRepository.setPlayer2(guests[0] || null)
        if (guests[0]) {
          io.to(guests[0]).emit('user-status', 'player2')
          guests.shift()
          connectionsRepository.setGuests(guests)
        }
      } else {
        guests = guests.filter(guest => guest !== socketId)
        connectionsRepository.setGuests(guests)
      }
      guests.forEach((guest, index) => io.to(guest).emit('user-status', `guest${index + 1}`))
  }
}
