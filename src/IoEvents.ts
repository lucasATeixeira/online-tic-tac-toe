import { Server, Socket } from 'socket.io'
import ConnectionsRepository from './repositories/ConnectionsRepository'
import GameStateRepository from './repositories/GameStateRepository'

import MoveService from './services/MoveService'
import SendBoardService from './services/SendBoarService'
import ConnectUserService from './services/ConnectUserService'
import DisconnectUserService from './services/DisconnectUserService'
import RestartGameService from './services/RestartGameService'

const connectionsRepository = new ConnectionsRepository()
const gameStateRepository = new GameStateRepository()

interface IMove {
  line: number,
  column: number,
}

export default class IoEvents {
  private io: Server
  private socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
    this.connect()

    this.socket.on('move', ({ line, column }) => this.move({ line, column }))
    this.socket.on('disconnect', () => this.disconnect())
  }

  private connect(): void {
    const connectUser = new ConnectUserService()
    const sendBoard = new SendBoardService()
    const restartGame = new RestartGameService()
    connectUser.execute(this.socket.id, this.io, connectionsRepository, gameStateRepository, restartGame)
    sendBoard.execute(this.io, gameStateRepository, this.socket.id)
  }

  private move({ line, column }: IMove): void {
    const restartGame = new RestartGameService()
    const move = new MoveService()
    move.execute(this.socket.id, this.io, { line, column }, restartGame, gameStateRepository, connectionsRepository)
  }

  private disconnect(): void {
    const disconnectUser = new DisconnectUserService()
    disconnectUser.execute(this.socket.id, connectionsRepository, this.io)
  }
}


