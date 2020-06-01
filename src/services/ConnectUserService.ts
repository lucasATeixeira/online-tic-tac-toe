import ConnectionsRepository from '../repositories/ConnectionsRepository'
import RestartGameService from '../services/RestartGameService'
import GameStateRepository from '../repositories/GameStateRepository'
import { Server } from 'socket.io'


export default class ConnectUserService {
  execute(
    socketId: string,
    io: Server,
    connectionsRepository: ConnectionsRepository,
    gameStateRepository: GameStateRepository,
    restartGame: RestartGameService
  ) {
    const connections = connectionsRepository.getConnections()
    let { player1, player2, guests } = connections

    if (!player1) {
      player1 = connectionsRepository.setPlayer1(socketId)
      io.to(socketId).emit('user-status', 'player1')

      if (!player2) restartGame.execute(io, gameStateRepository)

    } else if (!player2) {
      player2 = connectionsRepository.setPlayer2(socketId)
      io.to(socketId).emit('user-status', 'player2')

      if (!player1) restartGame.execute(io, gameStateRepository)
    } else {
      guests = connectionsRepository.setGuests([...guests, socketId])
      io.to(socketId).emit('user-status', `guest${guests.length}`)
    }

    io.emit('connected-users', guests.length + Number(!!player1) + Number(!!player2))
  }
}
