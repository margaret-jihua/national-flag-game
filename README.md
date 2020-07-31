# National Flag Game

This is a game of guessing national flags

## Intro of the Game

Flags help us to identify different countries around the world. A country's flag is made up of symbols, colors and sometimes phrases that represent its identity or character. Can you tell what country the flag belongs to?

## How to Play

Player has five hearts, if the wrong answer was clicked, one heart lost; if all five hearts were lost, player loses the game. 

## Building Process

1. Set up the Intro page layout and play button
2. Set up quiz by displaying a random flag, randomly list 3 other countries, insert the answer into the list randomly, and then place four of them into options
3. Click play button to display the quiz
4. Set up a result window to display Correct/Wrong, show some info of the flag country, and a close button to go to next quiz
5. Set up status bar to display hearts, scroes and restart
6. Add functionality of status bar
7. Set up the end-game page
8. Show gameover when player loses all five hearts
9. Display final score
10. Add 4 sound effects 
11. Add sound on/off symbol
12. Add favicon to the title
13. Make the result window moveable
14. Allow the result window only move within the container div
15. After close the result window, it returns back to original position
16. organize code, add div section to some css elements

## Challenge 1 

### Set up Quiz

- Randomly choose a countries as answer and display its flag
```
    answerIndex = Math.floor(Math.random() * numOfCountries)
    flag.setAttribute('src', countriesData[answerIndex]["flag"])
    answer = countriesData[answerIndex]["name"]
```
- Randomly choose 3 other countries store their index into array `options`
```
    let i = 0
    while (i < 3) {
        let index = Math.floor(Math.random() * numOfCountries)
        if(index !== answerIndex && !options.includes(index)){
            options.push(index)
            i++
        }
    }
```
- Randomly choose a position in `options` and then insert answer in it by array method `splice()`
```
    let answerOption = Math.floor(Math.random() * 4)
    options.splice(answerOption, 0, answerIndex)
```
- Store the corresponding names into array `optionText` and display them
```
    for (let i = 0; i < 4; i++) {
        let text = countriesData[options[i]]["name"]
        optionText.push(text)
    }
    a.textContent = optionText[0]
    b.textContent = optionText[1]
    c.textContent = optionText[2]
    d.textContent = optionText[3] 
```

## Challenge 2

### Make the result window moveable

- Use three eventListener: `mousedown`, `mousemove`, and `mouseup`
- Reference: https://javascript.info/mouse-drag-and-drop
- Figure out x-y coodinates

```
resultWindow.addEventListener('mousedown', function (event) {

    let windowLeft = resultWindow.getBoundingClientRect().left
    let windowTop = resultWindow.getBoundingClientRect().top
    
    let shiftX = event.clientX - windowLeft
    let shiftY = event.clientY - windowTop

    // get current coordinate and then set position to absolute
    resultWindow.style.position = 'absolute'
    moveAt(event.pageX, event.pageY)

    function moveAt (x, y) {
        resultWindow.style.left = x - shiftX + 'px'
        resultWindow.style.top = y - shiftY + 'px'  
    }

    function onMove (event) {
        moveAt(event.pageX, event.pageY)
    }    
    
    resultWindow.addEventListener('mousemove', onMove)
    
    resultWindow.onmouseup = function() {
        resultWindow.removeEventListener('mousemove', onMove)
        resultWindow.onmouseup = null
    }
})
```

## Challenge 3

### Return result window to its original position, so that next time it show up at the same place

Tried to add back what I had from style sheet, `position`, `bottom`, `left`:
```
.result {
    display: none;
    background-color: lightsalmon;
    opacity: 95%;
    height: 300px;
    width: 250px;
    border: salmon solid;
    border-radius: 10px;
    position: relative;
    bottom: 80%;
    left: 35%;
}
```
```
close.addEventListener('click', function() {
    resultWindow.style.display = 'none'
    resultWindow.style.postion = 'relative'
    resultWindow.style.bottom = '80%'
    resultWindow.style.left = '35%'
    setTimeout(displayOptions(),600)
    playerChoices.forEach(e => {e.disabled = false})
    // if no more hearts show gameover
    if (heartCount < 0){
        setTimeout(showEndGame(),600)
    }
})
```


However, when moving the window, the `top` value was changed, this way doesn't work

Then, I clear the style of `.result` in the script, it works 

```
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
```

## Challenge 4

### Let the reslute window only moves inside the container div

Add condition: 
```
let edgeLeft = container.getBoundingClientRect().left
if (resultWindow.getBoundingClientRect().left < edgeX) {
    resultWindow.style.left = edgeX
}
```

* Note that `resultWindow.style.left` returns `292px` but not `292`

Change the condition to: 
```
if (resultWindow.getBoundingClientRect().left < edgeX) {
    resultWindow.style.left = edgeX + 'px'
}
```

* Note that `getBoundingClientRect().left` returns a number

__This method work for left and top edges, but not right and bottom edges__
Possible solution...


## Open Source API

From [REST Countries](https://restcountries.eu/)

Actural API Link: https://restcountries.eu/rest/v2/all

## Open Source Sound Effect

https://www.myinstants.com/index/us/