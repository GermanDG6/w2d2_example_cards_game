
//CLASSES

class Player {
  constructor(name){
    this.name = name
    this.hand = []
    this.cardsValue = 0
  }
}

class Game {
  constructor(){
    this.players = []
    this.winner = {}
  }

  addPlayers(){
    for(let argument of arguments){
      this.players.push(argument)
    }
  }

  dealCards(){
    this.players.forEach((player)=>{
      player.hand.push(Math.floor(Math.random() * 10) + 1)
      player.hand.push(Math.floor(Math.random() * 10) + 1)
    })
  }

  getValueOfCards(){
    this.players.forEach((player)=>{
      player.cardsValue = player.hand[0] + player.hand[1]
    })
  }

  getWinner(){
    this.players.reduce((acc, player)=>{
      if(player.cardsValue > acc){
        acc = player.cardsValue
        this.winner = player
      }
      return acc
    }, 0)
  }
}


//DOM MANIPULATION

let game;

const beginGameButton = document.getElementById('begin-game')
const dealCardsButton = document.getElementById('deal-cards')
const checkWinnerButton = document.getElementById('check-winner')

const createPlayers = ()=>{
  const player1Name = document.getElementById('player1').value
  const player2Name = document.getElementById('player2').value

  const player1 = new Player(player1Name)
  const player2 = new Player(player2Name)

  createGame(player1, player2)

}

const createGame = (player1, player2)=>{
  game = new Game()
  game.addPlayers(player1, player2)
}

const changeInputsForNames = ()=>{
  const contentInsideInputsDiv = document.querySelectorAll('#inputs-div div')
  
  contentInsideInputsDiv[0].innerHTML = `<p>${game.players[0].name}</p>`
  contentInsideInputsDiv[1].innerHTML = `<p>${game.players[1].name}</p>`
}

const hideBeginGameButton = ()=>{
  beginGameButton.classList.add('display-none')
}

const showDealCardsButton = ()=>{
  document.getElementById('deal-cards').classList.remove('display-none')
}

const hideDealCardsButton = ()=>{
  document.getElementById('deal-cards').classList.add('display-none')
}

const showCheckWinnerButton = ()=>{
  document.getElementById('check-winner').classList.remove('display-none')
}

const showCardsOnScreen = ()=>{
  const contentInsideInputsDiv = document.querySelectorAll('#inputs-div div')

  const p1 = document.createElement('p')
  const p2 = document.createElement('p')

  p1.innerHTML = `${game.players[0].hand[0]} ${game.players[0].hand[1]}`
  p2.innerHTML = `${game.players[1].hand[0]} ${game.players[1].hand[1]}`

  contentInsideInputsDiv[0].appendChild(p1) 
  contentInsideInputsDiv[1].appendChild(p2)
}

const showWinnerInScreen = ()=>{
  const winnerText = document.getElementById('winner')

  winnerText.classList.remove('display-none')

  winnerText.innerText = `Felicidades! ${game.winner.name}! Has ganado con ${game.winner.cardsValue} puntos!`
}

beginGameButton.addEventListener('click', ()=>{
  createPlayers()
  changeInputsForNames()
  hideBeginGameButton()
  showDealCardsButton()
})

dealCardsButton.addEventListener('click', ()=>{
  game.dealCards()
  game.getValueOfCards()
  showCardsOnScreen()
  hideDealCardsButton()
  showCheckWinnerButton()
})

checkWinnerButton.addEventListener('click', ()=>{
  game.getWinner()
  showWinnerInScreen()
})

document.getElementById('reload').addEventListener('click', ()=>{
  location.reload()
})


