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

  public setPlayer1(player1: string | null): string | null {
    this.connections.player1 = player1
    return this.connections.player1
  }

  public setPlayer2(player2: string | null): string | null {
    this.connections.player2 = player2
    return this.connections.player2
  }

  public setGuests(guests: string[]): string[] {
    this.connections.guests = guests
    return this.connections.guests
  }
}
