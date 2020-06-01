import { Server } from 'socket.io'

import GameStateRepository from '../repositories/GameStateRepository'

interface IMove {
  line: number,
  column: number,
  player: string
}

export default class MoveService {
  public execute(
    socketId: string,
    io: Server,
    { line, column, player }: IMove,
    gameStateRepository: GameStateRepository
    )
  {
    console.log(line, column, player)
  }
}
