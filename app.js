const board = document.querySelector("#board");
let c = 0;
let a = 0; //used to check if its ladder or snake
let ch = [90, 70, 50, 30, 10];
let noch = [100, 80, 60, 40, 20]
let bool = false;
const jump = {
    5: 58,
    14: 49,
    53: 72,
    64: 83,
    38: 20,
    51: 10,
    76: 54,
    91: 73,
    97: 61
}
let p1Pos = 1;
let p2Pos = 1;
let rollBtn = document.querySelector("#roll");
let startReset = document.querySelector("#startRestart");
let h2 = document.querySelector("h2");
rollBtn.disabled = true;
let playerCount = "red";
let diceGif = document.querySelector("#diceGif");
let playPoint = document.querySelector("#playPoint");
let commentry = document.querySelector("#commentry");
playPoint.setAttribute("hidden", "hidden");


for (let i = 100; i > 0; i--) {
    let boardsq = document.createElement("div");
    if (ch.includes(i)) {
        bool = true;
    }
    if (noch.includes(i)) {
        bool = false;
        c = 0;
    }
    if (bool === false) {
        boardsq.setAttribute("id", `${i}`);
    }
    if (bool === true) {
        if (c === 0) {
            a = i - 9;
            c++;
        }
        boardsq.setAttribute("id", `${a}`);
        a++;
    }
    boardsq.classList.add("format");
    board.append(boardsq);
}

let firstDiv = document.getElementById("1");

let player2 = document.createElement("img");
player2.setAttribute("src", "./img/blue.png");
player2.classList.add("plyformat");
firstDiv.append(player2);

let player1 = document.createElement("img");
player1.setAttribute("src", "./img/red.png");
player1.classList.add("plyformat");
firstDiv.append(player1); 

startReset.addEventListener("click", () => {
    if (startReset.innerText === "Start") {
        commentry.innerText=""
        h2.innerText = "Player-1 Turn";
        rollBtn.disabled = false;
        startReset.innerText = "Reset";
        diceGif.setAttribute("hidden", "hidden");
        playPoint.removeAttribute("hidden");
    }
    else {
        rollBtn.disabled = true;
        startReset.innerText = "Start";
        firstDiv.append(player2);
        p2Pos = 1;
        firstDiv.append(player1);
        p1Pos = 1;
        h2.innerText = "Lets Play";
        playPoint.innerText = "Lets Roll!";
        commentry.innerText="Click on Start to Play!"
        playerCount = "red";
        diceGif.removeAttribute("hidden");
        playPoint.setAttribute("hidden", "hidden");
    }
});


rollBtn.addEventListener("click", () => {
    commentry.innerText = "";
    let inc = rollDice();
    if (playerCount === "red") {
        playPoint.innerText=`Player-1 got ${inc}`;
        if (p1Pos + inc <= 100) {
            p1Pos += inc;  
        }
        document.getElementById(`${p1Pos}`).append(player1);
        if (p1Pos in jump === true) {
            rollBtn.disabled = true;
            for (let i in jump) {
                if (p1Pos == i) {
                    if ([5,14,53,64].includes(p1Pos)) {
                        commentry.innerText = "Yay!! Player-1 got a Ladder!";
                    }
                    else {
                        commentry.innerText = "Snap!! Player-1 got bitten by a Snake!";
                    }
                    p1Pos = jump[i];
                }
            }
            setTimeout(() => {
                document.getElementById(`${p1Pos}`).append(player1);
                rollBtn.disabled = false;
            },1000);
        }
        if (inc !== 6) {
            playerCount = "blue";
            h2.innerText = "Player-2 Turn";
        }        
    }
    else if (playerCount === "blue") {
        playPoint.innerText=`Player-2 got ${inc}`;
        if (p2Pos + inc <= 100) {
            p2Pos += inc;   
        }
        document.getElementById(`${p2Pos}`).append(player2);
        if (p2Pos in jump === true) {
            rollBtn.disabled = true;
            for (let i in jump) {
                if (p2Pos == i) {
                    if ([5,14,53,64].includes(p2Pos)) {
                        commentry.innerText = "Yay!! Player-2 got a Ladder!";
                    }
                    else {
                        commentry.innerText = "Snap!! Player-2 got bitten by a Snake!";
                    }
                    p2Pos = jump[i];
                }
            }
            setTimeout(() => {
                document.getElementById(`${p2Pos}`).append(player2);
                rollBtn.disabled = false;
            },1000);
        }
        if (inc !== 6) {
            playerCount = "red";
            h2.innerText = "Player-1 Turn";
        }
    }
    if (p1Pos === 100) {
        setTimeout(() => {
            commentry.innerText = "Reset To Play Again!";
        },2000);
        commentry.innerText = "Player 1 Wins!!!";
        h2.innerText = "Player 1 Wins!!!";
        rollBtn.disabled = true;
    }
    else if (p2Pos === 100) {
        setTimeout(() => {
            commentry.innerText = "Reset To Play Again!";
        },2000);
        commentry.innerText = "Player 2 Wins!!!";
        h2.innerText = "Player 2 Wins!!!";
        rollBtn.disabled = true;
    }
});

function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}