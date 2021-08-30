const cells = document.querySelectorAll('[data-cell]')
const game = document.getElementById('game')
const winnerBcg = document.querySelector('.winner-bcg')
const header = document.getElementById('header')
const playAgainBtn = document.getElementById('button')

let playerSwitch = true
let currentClass
let moveCounter = 0
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


cells.forEach( cell => {
    cell.addEventListener('click', startEvents, {once: true})
})

playAgainBtn.addEventListener('click', () => {
    playerSwitch = true
    currentClass = ''
    moveCounter = 0
    header.innerText = ''
    winnerBcg.classList.remove('visible')
    game.classList.remove('o', 'x')
    game.classList.add('x')
    cells.forEach( cell => {
        cell.classList.remove('x', 'o')
        cell.removeEventListener('click', startEvents)
        cell.addEventListener('click', startEvents, {once: true})
    })
})

// FUNCTIONS

function startEvents(e) {
    const cell = e.target
    addPlayersMove(cell)
    if (checkEndGame(currentClass)){
        claimWinner(playerSwitch)
    }
    if (moveCounter === 9 && !checkEndGame(currentClass)) {
        claimDraw()
    }
    changePlayer(game)
}


function changePlayer(game) {
    playerSwitch = !playerSwitch
    if (playerSwitch) {
        game.classList.add('x')
        game.classList.remove('o')
    } else {
        game.classList.add('o')
        game.classList.remove('x')
    }
}

function addPlayersMove(cell) {
    moveCounter++
    if (playerSwitch) {
        cell.classList.add('x')
        currentClass = 'x'
    } else {
        cell.classList.add('o')
        currentClass = 'o'
    }
}

function checkEndGame(currentClass) {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass)
      })
    })
}

function claimWinner(playerSwitch) {
    if (playerSwitch) {
        header.innerText = 'Player X wins!'
    } else {
        header.innerText = 'Player O wins!'
    }

    winnerBcg.classList.add('visible')
}

function claimDraw () {
    winnerBcg.classList.add('visible')
    header.innerText = 'You have a draw.'
}