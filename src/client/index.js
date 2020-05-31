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

function awaitOtherUser() {
  const h3 = document.querySelector('h3')
  h3.innerHTML = 'Wait for another player to play'
}

function playing() {
  const h3 = document.querySelector('h3')
  h3.innerHTML = 'You are now playing'
}


socket.on('user-status', changeUserStatus)
socket.on('await-user', awaitOtherUser)
socket.on('playing', playing)
