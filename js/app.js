fetch("https://restcountries.eu/rest/v2/all")
.then(response => {
    return response.json()
})
.then(jsonData => {
    console.log(jsonData.length);
    let af = jsonData[0].flag
    document.querySelector('img').setAttribute('src', af)
})
