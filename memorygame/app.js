const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const griddisplay = document.querySelector('#grid')
let textdisplay = document.getElementById('text')
let resultdispaly = document.getElementById('result')
const startButton = document.getElementById('start')
let boardCreated = false;
let totalScore = 50
let cardChosen = []
let cardsChosenIds = []
let cardsWon = []

function createBoard(){
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src','images/blank.png')
        card.setAttribute('data-id',i)
        card.addEventListener('click',flipCard)
        griddisplay.appendChild(card)
    }
    let totalScore = 50
    cardsWon = []
    resultdispaly.innerHTML = totalScore
}

function removeBoard(){
    for (let i = 0; i < cardArray.length; i++){
        const card = document.querySelector('img')
        card.remove()
    }
    boardCreated = false;
}

startButton.addEventListener('click', () => {
    if (boardCreated) {
        removeBoard();
    }
    createBoard();
    boardCreated = true;
});


function checkMatch(){
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if(optionOneId == optionTwoId){
        textdisplay.innerHTML = "You have chosen the same cards!!"
        cards[optionOneId].setAttribute('src','images/blank.png')
    }

    else if (cardChosen[0] == cardChosen[1]){
        textdisplay.innerHTML = 'You found a match!!'
        cards[optionOneId].setAttribute('src','images/white.png')
        cards[optionTwoId].setAttribute('src','images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardChosen)
    } else {
        totalScore = totalScore - 2
        textdisplay.innerHTML = "Sorry wrong tiles!"
        cards[optionOneId].setAttribute('src','images/blank.png')
        cards[optionTwoId].setAttribute('src','images/blank.png')
    }
    cardChosen = []
    cardsChosenIds = []

    if(cardsWon.length == (cardArray.length/2)){
        textdisplay.innerHTML = " You won!!"
        totalScore = 50
        cardsWon = []
        removeBoard()
    }
    resultdispaly.innerHTML = totalScore
}

function flipCard(){
    const cardId = this.getAttribute('data-id')
    cardChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src',cardArray[cardId].img)
    if(cardChosen.length === 2){
        setTimeout(checkMatch, 500)
    }
}