const board = document.querySelector("#board");
let c = 0;
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

let player1 = document.createElement("img");
player1.setAttribute("src", "red.png");
player1.classList.add("plyformat");
let divBoard = document.getElementById("1");
divBoard.append(player1);

let rollBtn = document.querySelector("#roll");
rollBtn.addEventListener("click", () => {
    let inc = rollDice();
    if (p1Pos + inc <= 100) {
        p1Pos += inc;   
    }
    console.log(inc, p1Pos);
    document.getElementById(`${p1Pos}`).append(player1);
    if (p1Pos in jump === true) {
        rollBtn.disabled = true;
        for (let i in jump) {
            if (p1Pos == i) {
                p1Pos = jump[i];
            }
        }
        setTimeout(() => {
            document.getElementById(`${p1Pos}`).append(player1);
            rollBtn.disabled = false;
        },1000);
    }
    if (p1Pos === 100) {
        alert("Game Over");
        rollBtn.disabled = true;
    }
});

// let player2 = document.createElement("img");
// player2.setAttribute("src", "blue.png");
// player2.classList.add("plyformat");
// divBoard.append(player2);

function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}