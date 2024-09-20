const cards = [
    {
        name: '피카츄',
        img: 'img/피카츄.jpg'
    },
    {
        name: '피카츄',
        img: 'img/피카츄.jpg'
    },
    {
        name: '리자몽',
        img: 'img/리자몽.jpg'
    },
    {
        name: '리자몽',
        img: 'img/리자몽.jpg'
    },
    {
        name: '뮤',
        img: 'img/뮤.jpg'
    },
    {
        name: '뮤',
        img: 'img/뮤.jpg'
    },
    {
        name: '밀로틱',
        img: 'img/뱀같은년.jpg'
    },
    {
        name: '밀로틱',
        img: 'img/뱀같은년.jpg'
    },
    {
        name: '이상한년',
        img: 'img/이상한년.jpg'
    },
    {
        name: '이상한년',
        img: 'img/이상한년.jpg'
    },
    {
        name: '거북왕',
        img: 'img/거북왕.jpg'
    },
    {
        name: '거북왕',
        img: 'img/거북왕.jpg'
    }
]

document.addEventListener("DOMContentLoaded", () => {
    cards.sort(() => 0.5 - Math.random())
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardChosen = []
    let cardsChosenId = []
    let cardWon = []
    function createBoard(){
        for(let i=0; i<cards.length; i++){
            const card = document.createElement('img')
            card.setAttribute('src', "img/back.jpg")
            card.setAttribute('data-id',i)
            card.addEventListener('click', flipcard)
            grid.appendChild(card)
        }
    }
    function flipcard() {
        let cardId = this.getAttribute('data-id')
        cardChosen.push(cards[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cards[cardId].img)
        if (cardChosen.length === 2){
            setTimeout(checkForMatch, 500)
        }
    }
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if(optionOneId == optionTwoId){
            cards[optionOneId].setAttribute('src', 'img/back.jpg')
            cards[optionTwoId].setAttribute('src', 'img/back.jpg')
            alert('You have clicked the same image!')
        }else if (cardChosen[0]===cardChosen[1]){
            alert('You found a match')
            cards[optionOneId].setAttribute('src', 'img/하얀.jpg')
            cards[optionTwoId].setAttribute('src', 'img/하얀.jpg')
            cards[optionOneId].removeEventListener('click', flipcard)
            cards[optionTwoId].removeEventListener('click', flipcard)
            cardWon.push(cardChosen)
        }else {
            cards[optionOneId].setAttribute('src', 'img/back.jpg')
            cards[optionTwoId].setAttribute('src', 'img/back.jpg')
            alert('Sorry, try again')
        }
        cardChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardWon.length
        if (cardWon.length === cards.length/2){
            resultDisplay.textContent = 'Congratulation! You found them all!!'
        }
    }
    createBoard();
})