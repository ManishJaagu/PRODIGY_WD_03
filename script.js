let boxes = document.querySelectorAll(".box");
let turn = "X";
let gameOver = false;
let mode = "pvp"; // DEFAULT = PVP

//MODE SELECTION
document.querySelector("#pvp").addEventListener("click", () => {
    mode = "pvp";
    startGame();
});

document.querySelector("#pvc").addEventListener("click", () => {
    mode = "pvc";
    startGame();
});

//GAME
function startGame() {
    document.getElementById("mode-selection").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.addEventListener("click", () => {
            if (!gameOver && e.innerHTML === "") {
                e.innerHTML = turn;
                checkWin();
                checkDraw();
                if (!gameOver) {
                    changeTurn();
                }
                if (mode === "pvc" && turn === "O" && !gameOver) {
                    aiMove();
                }
            }
        });
    });
}

//CHANGE TURN
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// CODE PATTERN FOR CHECKING WINS
function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let v1 = boxes[winConditions[i][0]].innerHTML;
        let v2 = boxes[winConditions[i][1]].innerHTML;
        let v3 = boxes[winConditions[i][2]].innerHTML;

        if (v1 !== "" && v1 === v2 && v2 === v3) {
            gameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            document.querySelector("#play-again").style.display = "inline";

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

//DRAW FUNCTION
function checkDraw() {
    if (!gameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            gameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

//COMPUTER AI MOVES
function aiMove() {
    let emptyBoxes = [];
    boxes.forEach((e, i) => {
        if (e.innerHTML === "") {
            emptyBoxes.push(i);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxes[randomIndex].innerHTML = "O";
        checkWin();
        checkDraw();
        changeTurn();
    }
}

//PLAY AGAIN
document.querySelector("#play-again").addEventListener("click", () => {
    gameOver = false;
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
    document.getElementById("game-container").style.display = "none";
    document.getElementById("mode-selection").style.display = "block";
});
