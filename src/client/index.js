const socket = io()
const state = {
  whoAmI: '',
  nextMove: '',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
}

function changeUserStatus(status) {
  state.whoAmI = status

  const h2 = document.querySelector('h2')
  if (state.whoAmI === 'player1') {
    h2.innerHTML = 'You are O'
  } else if (state.whoAmI === 'player2') {
    h2.innerHTML = 'You are X'
  } else {
    h2.innerHTML = `You are ${state.whoAmI}`
  }
}

function changeConnectedUsers(connectedUsers) {
  const h3 = document.querySelector('h3')

  if (connectedUsers > 2) {
    h3.innerHTML = `You and ${connectedUsers - 1} more players are online`
  } else if (connectedUsers === 2) {
    h3.innerHTML = `You and ${connectedUsers - 1} more player are online`
  } else {
    h3.innerHTML = `Only you are connected, wait for another player`
  }

}

function boardUpdate(data) {
  const { board, nextMove } = JSON.parse(data)
  state.board = board
  state.nextMove = nextMove

  const h4 = document.querySelector('h4')

  if (state.whoAmI === state.nextMove) {
    h4.innerHTML = 'Its your turn'
  } else if (state.nextMove === 'player1') {
    h4.innerHTML = "It's O turn"
  } else if (state.nextMove === 'player2') {
    h4.innerHTML = "It's X turn"
  } else {
    h4.innerHTML = ''
  }

  for (let i = 0; i < state.board.length; i += 1) {
    for (let j = 0; j < state.board[i].length; j += 1) {
      const cell = `#cell${i * 3 + j}`
      const div = document.querySelector(cell)
      if (state.board[i][j] === 'player1') {
        div.innerHTML = 'O'
      }
      if (state.board[i][j] === 'player2') {
        div.innerHTML = 'X'
      }
    }
  }
}

socket.on('user-status', changeUserStatus)
socket.on('connected-users', changeConnectedUsers)
socket.on('board', boardUpdate)
