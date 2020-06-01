import { Server } from 'socket.io'

import GameStateRepository from '../repositories/GameStateRepository'
import ConnectionsRepository from '../repositories/ConnectionsRepository'

interface IMove {
  line: number,
  column: number,
}

export default class MoveService {
  public execute(
    socketId: string,
    io: Server,
    { line, column }: IMove,
    gameStateRepository: GameStateRepository,
    connectionsRepository: ConnectionsRepository
    )
  {
    let { board, nextMove } = gameStateRepository.getGameState()
    const connections = connectionsRepository.getConnections()

    if (nextMove && nextMove === 'player1') {
      const nextPlayerSocket = connections[nextMove]
      if (socketId !== nextPlayerSocket) return
      const cell = board[line][column]
      if (cell) return
      board[line][column] = 'player1'
      board = gameStateRepository.setBoard(board)
      nextMove = gameStateRepository.setNextMove('player2')
    } else if (nextMove && nextMove === 'player2') {
      const nextPlayerSocket = connections[nextMove]
      const cell = board[line][column]
      if (cell) return
      if (socketId !== nextPlayerSocket) return
      board[line][column] = 'player2'
      board = gameStateRepository.setBoard(board)
      nextMove = gameStateRepository.setNextMove('player1')
    }

    io.emit('board', JSON.stringify({
      nextMove,
      board
    }))
  }
}
