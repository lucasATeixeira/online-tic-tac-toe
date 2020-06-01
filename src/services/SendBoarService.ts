import { Server } from 'socket.io'

import GameStateRepository from '../repositories/GameStateRepository'

export default class SendBoardService {
  public execute(io: Server, gameStateRepository: GameStateRepository, socketId?: string): void {
    const { board, nextMove } = gameStateRepository.getGameState()

    if (socketId) {
      io.to(socketId).emit('board', JSON.stringify({
        nextMove, board
      }))
      return
    }

    io.emit('board', JSON.stringify({
      nextMove, board
    }))
  }
}
