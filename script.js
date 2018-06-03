const stateButton = document.querySelector(".tick");
const strictButton = document.querySelector(".strict-button");
const startButton = document.querySelector(".start-button");
const strictLight = document.querySelector(".strict-light");
const btn = Array.from(document.querySelectorAll(".btn"));
const displayText = document.querySelector(".display-text");

let gameOn = false;
let gameStart = false;
let round = 0;
let clickTime = false;
let chosenPieces = [];
let playerPieces = [];

stateButton.addEventListener("click", () => {
    if (stateButton.classList.contains("tick-on")) {
        stateButton.classList.remove("tick-on");
        gameOn = false;
        displayText.innerHTML = "";
        round = 0;
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
        gameStart = true;
        displayText.innerHTML = "00";
        twoBlinks(displayText);
        round = 0;
        chosenPieces = [];
        setTimeout(playRound, 500);
    }
});

strictButton.addEventListener("click", () => {
    if (strictLight.classList.contains("light-on")) {
        strictLight.classList.remove("light-on");
    } else {
        strictLight.classList.add("light-on");
    }
});

function addColor(time) {
    let color = Math.floor(Math.random() * 4);
    chosenPieces.push(color);
    console.log("rnd: " + chosenPieces);
    for (let i in chosenPieces){
        setTimeout(()=>{buttonPlay(i, time)}, time);
    }
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
                playerPieces.push(i);
                // console.log(playerPieces);
                if (playerPieces.length === chosenPieces.length) {
                    clickTime = false;
                    playRound();
                }
            }
        });
    }
}

function playRound() {
    round++;
    if (round < 10) {
        displayText.innerHTML = "0" + round;
    } else {
        displayText.innerHTML = round;
    }
    playerPieces = [];
    addColor(300);
    player();
}

