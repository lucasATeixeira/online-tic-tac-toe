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

function handleCellClick() {
  const cells = document.getElementsByClassName('cell')
  const linesAndColumns = {
    cell0: {
      line: 0,
      column: 0
    },
    cell1: {
      line: 0,
      column: 1
    },
    cell2: {
      line: 0,
      column: 2
    },
    cell3: {
      line: 1,
      column: 0
    },
    cell4: {
      line: 1,
      column: 1
    },
    cell5: {
      line: 1,
      column: 2
    },
    cell6: {
      line: 2,
      column: 0
    },
    cell7: {
      line: 2,
      column: 1
    },
    cell8: {
      line: 2,
      column: 2
    },
  }

  for (let i = 0; i < cells.length; i += 1) {
    let cell = cells[i]
    cell.addEventListener('click', () => {
      if (state.whoAmI !== state.nextMove) return
      socket.emit('move', linesAndColumns[cell.id])
    })
  }
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

function updateBoard(data) {
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
        div.classList.add('O')
        continue
      }
      if (state.board[i][j] === 'player2') {
        div.innerHTML = 'X'
        div.classList.add('X')
        continue
      }
      div.innerHTML = ''
    }
  }
}

function endGame(result) {
  const h4 = document.querySelector('h4')

  if (result === 'fullyFilledBoard') {
    h4.innerHTML = 'There were no winner, wait for game restart'
    return
  }

  h4.innerHTML = `${result === 'player1' ? 'O' : 'X'} won, wait for game restart`
}

handleCellClick()
socket.on('user-status', changeUserStatus)
socket.on('connected-users', changeConnectedUsers)
socket.on('board', updateBoard)
socket.on('end-game', endGame)
