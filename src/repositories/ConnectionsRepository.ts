interface IConnection {
  player1: string | null,
  player2: string | null,
  guests: string[]
}

export default class ConnectionsRepository {
  private connections: IConnection

  constructor() {
    this.connections = {
      player1: null,
      player2: null,
      guests: []
    }
  }

  public getConnections(): IConnection {
    return this.connections
  }

  public setPlayer1(player1: string | null): void {
    this.connections.player1 = player1
  }

  public setPlayer2(player2: string | null): void {
    this.connections.player2 = player2
  }

  public setGuests(guests: string[]): void {
    this.connections.guests = guests
  }
}
