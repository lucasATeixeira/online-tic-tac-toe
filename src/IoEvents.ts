import { Server, Socket } from 'socket.io'
import ConnectionsRepository from './repositories/ConnectionsRepository'
import ConnectUserService from './services/ConnectUserService'
import DisconnectUserService from './services/DisconnectUserService'

const connectionsRepository = new ConnectionsRepository()

export default class IoEvents {
  private io: Server
  private socket: Socket

  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
    this.connect()

    this.socket.on('disconnect', () => this.disconnect())
  }

  private connect(): void {
    const connectUser = new ConnectUserService()
    connectUser.execute(this.socket.id, connectionsRepository, this.io)
  }

  private disconnect(): void {
    const disconnectUser = new DisconnectUserService()
    disconnectUser.execute(this.socket.id, connectionsRepository, this.io)
  }
}


