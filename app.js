
console.log("START JS");

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell"); /* vient recup les cells en tant que liste, meme selecteur que css */

/* combo des index de grille qui forment un cas de victoire */
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let announce = document.querySelector(".announce");
let gameOver = false;
let currentPlayer = "X"
let currentAge = 10;


function fade(){
    for(let i=0; i<9; i++){
        if(cells[i].dataset.age == currentAge-6) cells[i].textContent = cells[i].textContent.toLowerCase();
        if(cells[i].dataset.age == currentAge-7) cells[i].textContent = "";
    }
}

function checkWin() {
    /* some = methode qui applique une condition sur tout le tab, et return true si y'a un true, false sinon
       every = methode comme some mais qui renvoie true si tout est vrai, false sinon
       Enfin, la syntaxe "(currentVal) => currentVal < 40" cree une mini fct annonyme
    */
    return winCombos.some(combo => {
        return combo.every((index) => cells[index].textContent === currentPlayer);
    })
}

function switchPlayer(){
    if(currentPlayer === "X") currentPlayer = "O";
    else currentPlayer = "X"
}


function handleClick(event) {
    if(gameOver) return;

    const cell = event.target; /* je recup la target du clic */
    if(!cell.classList.contains("cell")) return; /* test si c'est bien une cell */
    if(cell.textContent !== '') return;


    cell.textContent = currentPlayer;
    cell.dataset.age = currentAge;
    currentAge++;

    fade();

    if(checkWin()){
        console.log("Win of " + currentPlayer);
        announce.textContent = currentPlayer + " wins !"
        gameOver = true;
    } else {
        switchPlayer();
        announce.textContent = currentPlayer + " is playing..."
    }    
}
board.addEventListener("click",handleClick)