const board = document.querySelector("#board");

for (let i = 1; i <= 100; i++) {
    let boardsq = document.createElement("div");
    boardsq.setAttribute("id", `${i}`);
    boardsq.classList.add("format");
    board.append(boardsq);
}