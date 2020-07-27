let play = document.querySelector('#play-btn')
let intro = document.querySelector('.intro')

fetch("https://restcountries.eu/rest/v2/all")
.then(response => {
    return response.json()
})
.then(jsonData => {
    console.log(jsonData.length)
    let af = jsonData[0].flag
})

play.addEventListener('click', function() {
    intro.style.display = 'none'
})