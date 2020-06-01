const socket = io()
const state = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
}

function changeUserStatus(status) {
  const h2 = document.querySelector('h2')
  if (status === 'player1') {
    h2.innerHTML = 'You are O'
  } else if (status === 'player2') {
    h2.innerHTML = 'You are X'
  } else {
    h2.innerHTML = `You are ${status}`
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

function boardUpdate(board) {
  state.board = JSON.parse(board)

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
