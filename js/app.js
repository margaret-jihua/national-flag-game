let play = document.querySelector('#play-btn')
let intro = document.querySelector('.intro')
let quiz = document.querySelector('.quiz')
let flag = document.querySelector('.flag')
let playerChoices = document.querySelectorAll('.options')
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')
let resultWindow = document.querySelector('.result')
let displayResult = document.querySelector('.display-result')
let countryName = document.querySelector('.name')
let capital = document.querySelector('.capital')
let subregion = document.querySelector('.subregion')
let area = document.querySelector('.area')
let population = document.querySelector('.population')
let close = document.querySelector('#close-btn')
let countriesData
let numOfCountries
let answerIndex
let answer
let options = []
let optionText = []
let usedIndex = []

// Display random chosen countries along with the flag country

function displayOptions() {
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
    console.log(answerIndex, options, optionText)
    // display country names stored in optionText[]
    a.textContent = optionText[0]
    b.textContent = optionText[1]
    c.textContent = optionText[2]
    d.textContent = optionText[3]  
}

// Fetch info from API

fetch("https://restcountries.eu/rest/v2/all")
.then(response => {
    return response.json()
})
.then(jsonData => {
    countriesData = jsonData

    // get total number of countries
    numOfCountries = countriesData.length

    // get random index and set up quiz
    answerIndex = Math.floor(Math.random() * numOfCountries)
    flag.setAttribute('src', countriesData[answerIndex]["flag"])
    answer = countriesData[answerIndex]["name"]
    
    // assign value to options
    displayOptions()

    
})
.catch(err => {
    console.log("there was an error fetching the results")
    console.log(err)
})

// Click [Let's Play] Button

play.addEventListener('click', function() {
    intro.style.display = 'none'
    setTimeout(function(){
        quiz.style.display = 'block'
    },100)
})

// Player make a choice

playerChoices.forEach(choice => {
    choice.addEventListener('click', function() {

    })
})