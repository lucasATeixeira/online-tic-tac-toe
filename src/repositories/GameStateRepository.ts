interface IGameState {
  firstMove: string | null,
  lastMove: string | null,
  board: string[][]
}

export default class GameStateRepository {
  private gameState: IGameState

  constructor() {
    this.gameState = {
      firstMove: null,
      lastMove: null,
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
    }
  }

  public getGameState(): IGameState {
    return this.gameState
  }

  public setFirstMove(player: string): string {
    this.gameState.firstMove = player
    return this.gameState.firstMove
  }

  public setLastMove(player: string): string {
    this.gameState.lastMove = player
    return this.gameState.lastMove
  }

  public setBoard(board: string[][]): string[][] {
    this.gameState.board = board
    return this.gameState.board
  }
}
