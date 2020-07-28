let play = document.querySelector('#play-btn')
let intro = document.querySelector('.intro')
let quiz = document.querySelector('.quiz')
let flag = document.querySelector('.flag')
let a = document.querySelector('.a')
let b = document.querySelector('.b')
let c = document.querySelector('.c')
let d = document.querySelector('.d')
//let allCountriesNames = []
let usedIndex = []
let countries
let numOfCountries
let answerIndex
let answer
let optionA
let optionB
let optionC
let optionD

function displayOptions() {
    // assign answer to one of the options
    
}

// Fetch info from API
fetch("https://restcountries.eu/rest/v2/all")
.then(response => {
    return response.json()
})
.then(jsonData => {
    countries = jsonData

    // get total number of countries
    numOfCountries = countries.length

    // get random index and set up quiz
    answerIndex = Math.floor(Math.random() * numOfCountries)
    flag.setAttribute('src', countries[answerIndex]["flag"])
    answer = countries[answerIndex]["name"]
    
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