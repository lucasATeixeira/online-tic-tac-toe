const socket = io()

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
  console.log(connectedUsers)
  const h3 = document.querySelector('h3')

  if (connectedUsers > 2) {
    h3.innerHTML = `You and ${connectedUsers - 1} more players are online`
  } else if (connectedUsers === 2) {
    h3.innerHTML = `You and ${connectedUsers - 1} more player are online`
  } else {
    h3.innerHTML = `Only you are connected, wait for another player`
  }

}

socket.on('user-status', changeUserStatus)
socket.on('connected-users', changeConnectedUsers)
