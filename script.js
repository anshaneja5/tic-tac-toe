const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
let gameGridCount=0;
let flag=0;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    gameInfo.innerHTML=`Current Player - ${currentPlayer}`;
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameGridCount=0;
    flag=0;
}
initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" )
        && (gameGrid[position[0]] === gameGrid[position[1]]) &&(gameGrid[position[1]] === gameGrid[position[2]])){
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            flag=1;
            newGameBtn.classList.add("active");
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            if(gameGrid[position[0]]==="X"){
                gameInfo.innerText="Winner-X";
            }
            else{
                gameInfo.innerText="Winner-O";
            }
        }
        if(gameGridCount==9 && flag==0){
            console.log(boxes[position[0]]);
            gameInfo.innerText="Game is Tied";
            newGameBtn.classList.add("active");
        }
    })
}

newGameBtn.addEventListener('click',initGame);

function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        gameGridCount++;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})
