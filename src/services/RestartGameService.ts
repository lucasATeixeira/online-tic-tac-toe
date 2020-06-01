import GameStateRepository from '../repositories/GameStateRepository'
import { Server } from 'socket.io'

interface IGameState {
  nextMove: string | null,
  board: string[][]
}

export default class RestartGameService {
  public execute(io: Server, gameStateRepository: GameStateRepository): IGameState {
    const randomOneOrTwo = Math.round(Math.random() + 1)
    const firstPlayer = `player${randomOneOrTwo}`

    const board = gameStateRepository.setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    const nextMove = gameStateRepository.setNextMove(firstPlayer)

    io.emit('board', JSON.stringify({
      nextMove, board
    }))

    return {
      nextMove,
      board
    }
  }
}
