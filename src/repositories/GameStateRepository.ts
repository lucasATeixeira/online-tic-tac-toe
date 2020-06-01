interface IGameState {
  nextMove: 'player1' | 'player2' | null,
  board: string[][]
}

export default class GameStateRepository {
  private gameState: IGameState

  constructor() {
    this.gameState = {
      nextMove: null,
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

  public setNextMove(player: 'player1' | 'player2'): 'player1' | 'player2' {
    this.gameState.nextMove = player
    return this.gameState.nextMove
  }

  public setBoard(board: string[][]): string[][] {
    this.gameState.board = board
    return this.gameState.board
  }
}
