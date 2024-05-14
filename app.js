const board = document.querySelector("#board");
let c = 0;
let ch = [90, 70, 50, 30, 10];
let noch = [100, 80, 60, 40, 20]
let bool = false;
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

let divBoard = document.getElementById("1");
console.log(divBoard);

divBoard.style.backgroundColor = "red";