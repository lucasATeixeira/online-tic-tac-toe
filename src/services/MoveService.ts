import { Server } from 'socket.io'

import GameStateRepository from '../repositories/GameStateRepository'
import ConnectionsRepository from '../repositories/ConnectionsRepository'
import RestartGameService from '../services/RestartGameService'

interface IMove {
  line: number,
  column: number,
}

function verifyWinner(response: string, current: string): string {
  if (current === '' || response === '' || response === '0') return '0'
  if (current === response) return current
  return '1'
}
export default class MoveService {
  public execute(
    socketId: string,
    io: Server,
    { line, column }: IMove,
    restartGame: RestartGameService,
    gameStateRepository: GameStateRepository,
    connectionsRepository: ConnectionsRepository
    )
  {
    let { board, nextMove } = gameStateRepository.getGameState()
    const connections = connectionsRepository.getConnections()

    if (nextMove && !board[line][column] && socketId === connections[nextMove]) {
      board[line][column] = nextMove
      board = gameStateRepository.setBoard(board)
      nextMove = gameStateRepository.setNextMove(nextMove === 'player1' ? 'player2' : 'player1')

      io.emit('board', JSON.stringify({
        nextMove,
        board
      }))

      const firstLine = board.slice(0, 1)[0].reduce(verifyWinner)
      const secondLine = board.slice(1, 2)[0].reduce(verifyWinner)
      const thirdLine = board.slice(2)[0].reduce(verifyWinner)
      const firstColumn = board.map(line => line[0]).reduce(verifyWinner)
      const secondColumn = board.map(line => line[1]).reduce(verifyWinner)
      const thirdColumn = board.map(line => line[2]).reduce(verifyWinner)
      const firstDiagonal = [ board[0][0], board[1][1], board[2][2] ].reduce(verifyWinner)
      const secondDiagonal = [ board[0][2], board[1][1], board[2][0] ].reduce(verifyWinner)

      let fullBoard = true
      const boardStatus = [firstLine, secondLine, thirdLine, firstColumn, secondColumn, thirdColumn, firstDiagonal, secondDiagonal]

      for (let b of boardStatus) {
        if (b === '0') fullBoard = false
        if (b === 'player1' || b === 'player2') {
          io.emit('end-game', b === 'player1' ? 'player1' : 'player2')
          setTimeout(() => restartGame.execute(io, gameStateRepository), 3000)
          return
        }
      }

      if (fullBoard) {
        io.emit('end-game', 'full-board')
        setTimeout(() => restartGame.execute(io, gameStateRepository), 3000)
        return
      }
    }
  }
}
