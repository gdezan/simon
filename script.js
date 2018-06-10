const stateButton = document.querySelector(".tick");
const strictButton = document.querySelector(".strict-button");
const startButton = document.querySelector(".start-button");
const strictLight = document.querySelector(".strict-light");
const btn = Array.from(document.querySelectorAll(".btn"));
const displayText = document.querySelector(".display-text");
const title = document.querySelector("h1");

let gameOn = false;
let gameStart = false;
let round = 0;
let clickTime = false;
let chosenPieces = [];
const playerPieces = [];
let nextRound = false;
let strict = false;
let looseError = false;

stateButton.addEventListener("click", () => {
    if (stateButton.classList.contains("tick-on")) {
        stateButton.classList.remove("tick-on");
        gameOn = false;
        clickTime = false;
        chosenPieces = [];
        gameStart = false;
        displayText.innerHTML = "";
        round = 0;
        window.stop();
        strictLight.classList.remove("light-on");
        strict = false;
    } else {
        stateButton.classList.add("tick-on");
        gameOn = true;
        displayText.innerHTML = "--";
        twoBlinks(displayText);
    }
});

function twoBlinks(f) {
    setTimeout(() => {
        let i = 0;
        let id = setInterval(() => {
            f.style.display = f.style.display == "none" ? "" : "none";
            i++;
            if (i > 3) {
                clearInterval(id);
            }
        }, 100);
    }, 100);
}

startButton.addEventListener("click", () => {
    if (gameOn) {
        gameBegin();
    }
});

function gameBegin() {
    gameStart = true;
    displayText.innerHTML = "00";
    twoBlinks(displayText);
    round = 0;
    chosenPieces = [];
    setTimeout(playRound, 1000);
}

strictButton.addEventListener("click", () => {
    if (strictLight.classList.contains("light-on")) {
        strictLight.classList.remove("light-on");
        strict = false;
    } else {
        strictLight.classList.add("light-on");
        strict = true;
    }
});

function addColor(time) {
    let color = Math.floor(Math.random() * 4);
    if (looseError == false){
        chosenPieces.push(color);
    } else {
        looseError = false;
    }
    for (let i in chosenPieces) {
        setTimeout(() => {
            buttonPlay(chosenPieces[i], time);
        }, time * i * 2.0);
    }
}

function isEqual(a, b) {
    let ans = true;
    for (let i in a) {
        if (a[i] != b[i]) {
            ans = false;
        }
    }
    return ans;
}

function buttonPlay(i, time) {
    const audio = document.querySelector(`audio[data-key="${i}"]`);
    btn[i].classList.add("btn-on");
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
        btn[i].classList.remove("btn-on");
    }, time);
}

function player() {
    clickTime = true;
    for (let i in btn) {
        btn[i].addEventListener("mousedown", () => {
            if (clickTime) {
                buttonPlay(i, 300);
            }
        });
    }
}

for (let i in btn) {
    btn[i].addEventListener("mouseup", () => {
        if (clickTime) {
            playerPieces.push(i);
            if (playerPieces[playerPieces.length - 1] != chosenPieces[playerPieces.length - 1]) {
                gameError();
            } else if (playerPieces.length === chosenPieces.length) {
                clickTime = false;
                if (isEqual(playerPieces, chosenPieces)) {
                    if (round == 20) {
                        gameWin();
                    } else {
                        setTimeout(playRound, 700);
                    }
                }
            }
        }
    });
}

function gameError() {
    displayText.innerHTML = "!!";
    twoBlinks(displayText);
    if (strict){
        setTimeout(gameBegin, 1000);
    } else {
        round--;
        looseError = true;
        setTimeout(playRound,1000);
    }
    
}

function gameWin() {
    title.innerHTML = "You won!!";
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            setTimeout(() => {buttonPlay(0, 100)}, 100);
            setTimeout(() => {buttonPlay(1, 100)}, 200);
            setTimeout(() => {buttonPlay(3, 100)}, 300);
            setTimeout(() => {buttonPlay(2, 100)}, 400);
        }, 401 * i);
    }
    setTimeout(gameBegin, 2300);
    setTimeout(()=>{title.innerHTML = "Simon&#174 Game"}, 2300);
}

function playRound() {
    round++;
    if (round < 10) {
        displayText.innerHTML = "0" + round;
    } else {
        displayText.innerHTML = round;
    }
    playerPieces.length = 0;
    addColor(300);
    player();
}
