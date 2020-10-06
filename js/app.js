// let container = document.querySelector('.container')
let play = document.querySelector('.play-btn')
let speaker = document.querySelector('#speaker')
let intro = document.querySelector('.intro')
let quiz = document.querySelector('.quiz')
let heart = document.querySelectorAll('.heart')
let restart = document.querySelector('.restart')
let correct = document.querySelector('#correct')
let wrong = document.querySelector('#wrong')
let flag = document.querySelector('.flag')
let playerChoices = document.querySelectorAll('.option')
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')
let resultWindow = document.querySelector('.result')
let displayResult = document.querySelector('.display-result')
let countryName = document.querySelector('.name')
let subregion = document.querySelector('.subregion')
let capital = document.querySelector('.capital')
let area = document.querySelector('.area')
let population = document.querySelector('.population')
let close = document.querySelector('.close-btn')
let gameover = document.querySelector('.gameover')
let finalCorrect = document.querySelector('#final-correct')
let totalQuiz = document.querySelector('#total-quiz')
let finalScore = document.querySelector('#score')
let playAgain = document.querySelector('.play-again')
let countriesData
let numOfCountries
let answerIndex
let answer
let result
let correctCount = 0
let wrongCount = 0
let heartCount = 4
let soundON = true

/*------------------------Functions--------------------------*/

// Display random chosen countries along with the flag country

function displayOptions() {
    let options = []
    let optionText = []

    // get a random country index, set up flag and answer
    answerIndex = Math.floor(Math.random() * numOfCountries)
    flag.setAttribute('src', countriesData[answerIndex]["flag"])
    answer = countriesData[answerIndex]["name"]

    // get 3 random country index for choices
    let i = 0
    while (i < 3) {
        let index = Math.floor(Math.random() * numOfCountries)
        if(index !== answerIndex && !options.includes(index)){
            options.push(index)
            i++
        }
    }

    // choose a random index to put answer into options
    let answerOption = Math.floor(Math.random() * 4)
    options.splice(answerOption, 0, answerIndex)

    // store chosen names into optionText[]
    for (let i = 0; i < 4; i++) {
        let text = countriesData[options[i]]["name"]
        optionText.push(text)
    }

    // console.log(answerIndex, options, optionText)

    // display country names stored in optionText[]
    a.textContent = optionText[0]
    b.textContent = optionText[1]
    c.textContent = optionText[2]
    d.textContent = optionText[3]  
}

// -----------------------------------------------------

// Show the result Window and change status bar

function showResult(theChoice){
    if (theChoice === answer) {
        result = 'Correct!'
        correctCount ++
        correct.textContent = correctCount
        let corroctSound = new Audio('./sounds/correct.mp3')
        if (soundON) { corroctSound.play() }
        
    }
    else {
        result = 'oops Wrong...'
        wrongCount ++
        wrong.textContent = wrongCount
        heart[heartCount].style.display = 'none'
        heartCount --
        let wrongSound = new Audio('./sounds/incorrect.mp3')
        if (soundON) { wrongSound.play() }
    }
    displayResult.textContent = result
    countryName.textContent = answer
    subregion.textContent = 'Subregion: ' + countriesData[answerIndex]["subregion"]
    capital.textContent = 'Capital: ' + countriesData[answerIndex]["capital"]
    area.textContent = 'Area: ' + countriesData[answerIndex]["area"]
    population.textContent = 'Population: ' + countriesData[answerIndex]["population"]
    playerChoices.forEach(e => {e.disabled = true})
}

// -----------------------------------------------------

// Restart the game

function gameRestart() {
    correctCount = 0
    correct.textContent = 0
    wrongCount = 0
    wrong.textContent = 0
    heartCount = 4
    heart.forEach(e => {e.style.display = 'block'})
    setTimeout(displayOptions(),600)
}

// -----------------------------------------------------

// Show the game is over and display score

function showEndGame(){
    quiz.style.display = 'none'
    gameover.style.display = 'block'
    let total = correctCount + wrongCount
    let score = Math.floor(correctCount / total * 100)
    finalCorrect.textContent = correctCount
    totalQuiz.textContent = total
    finalScore.textContent = score
    let endGameSound = new Audio('./sounds/gameover.wav')
    if (soundON) { endGameSound.play() }    
}


/*--------------------Fetch--------------------------- */

// Fetch info from API

fetch("https://restcountries.eu/rest/v2/all")
.then(response => {
    return response.json()
})
.then(jsonData => {
    countriesData = jsonData
    // get total number of countries
    numOfCountries = countriesData.length
    // assign value to options
    displayOptions() // Later should move to section: Click [Let's Play] Button    
})
.catch(err => {
    console.log("there was an error fetching the results")
    console.log(err)
})

/* ---------------------DOM--------------------------*/

// Click [Let's Play] Button

play.addEventListener('click', function() {
    intro.style.display = 'none'
    setTimeout(function(){
        quiz.style.display = 'block'
    },200)
    let beginSound = new Audio('./sounds/begin.mp3')
    if (soundON) { beginSound.play() }
})

// -----------------------------------------------------

// Player make a choice

playerChoices.forEach(choice => {
    choice.addEventListener('click', function() {
        showResult(choice.textContent)
        resultWindow.style.display = 'block'
    })
})

// -----------------------------------------------------

// Close the result window & get into next quiz

close.addEventListener('click', function() {
    resultWindow.style = ''
    resultWindow.style.display = 'none'
    setTimeout(displayOptions(),600)
    playerChoices.forEach(e => {e.disabled = false})
    // if no more hearts show gameover
    if (heartCount < 0){
        setTimeout(showEndGame(),600)
    }
})

// -----------------------------------------------------

// Click [restart]

restart.addEventListener('click', function() {
    gameRestart()
})

// -----------------------------------------------------

// Click [Play Again]
playAgain.addEventListener('click', function() {
    gameover.style.display = 'none'
    quiz.style.display = 'block'
    gameRestart()
})

// -----------------------------------------------------

// Toggle speaker icon

speaker.addEventListener('click', function() {
    let source = speaker.getAttribute('src')
    if (source === './images/sound-on.png') {
        speaker.setAttribute('src','./images/mute.png')
        soundON = false
    }
    else {
        speaker.setAttribute('src', './images/sound-on.png')
        soundON = true
    }
})

// -----------------------------------------------------

// Drag result window anywhere [within container div --- orz almost made it...]


    // set boundry for result window
    // Doesn't work if there is scroll in the browser
    // if (x - edgeLeft < x - windowLeft) {
    //     resultWindow.style.left = edgeLeft + 'px'
    // }
    // if (edgeLeft + 850 - x < windowLeft + 250 - x) {
    //     resultWindow.style.left = edgeLeft + 600 + 'px'
    // }
    // if (windowTop < edgeTop) {
    //     resultWindow.style.top = edgeTop + 'px'
    // }
    // if (windowTop > edgeTop + 200) {
    //     resultWindow.style.top = edgeTop + 200 + 'px'
    // }


// function onMove (event) {
//     moveAt(event.pageX, event.pageY)             
//  } 

resultWindow.addEventListener('mousedown', function (event) {
    // get current coordinate and then set position to absolute
    resultWindow.style.position = 'absolute'
    // moveAt(event.pageX, event.pageY)
    moveAt(event)
    
    function moveAt (event) {
    // let edgeLeft = container.getBoundingClientRect().left
    // let edgeTop = container.getBoundingClientRect().top

    let windowLeft = resultWindow.getBoundingClientRect().left
    let windowTop = resultWindow.getBoundingClientRect().top
    
    let shiftX = event.PageX - windowLeft
    let shiftY = event.pageY - windowTop

    
    resultWindow.style.left = event.pageX - shiftX + 'px'
    resultWindow.style.top = event.pageY - shiftY + 'px'
}
    resultWindow.addEventListener('mousemove', moveAt(event))
    
    resultWindow.onmouseup = function() {
        resultWindow.removeEventListener('mousemove', moveAt(event))
        resultWindow.onmouseup = null
    }
})

// prevent conflict with browser's default drag’n’drop support
resultWindow.ondragstart = function() {
    return false;
}