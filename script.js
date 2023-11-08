const gameboard = function() {
    let board = Array(3).fill().map(() => Array(3).fill(" "));

    function showBoard() {
        board.forEach((row) => console.log(`${row[0]} | ${row[1]} | ${row[2]}`));
    }

    function getBoard() {
        return board;
    }

    return {showBoard, getBoard};

}();

const createUser = function(name, mark) {

   
    return {name, mark};
}

const game = function() {
    
   
    let playerOne = createUser("Player One", "X");
    let playerTwo = createUser("Player Two", "O");
    let gameIsActive = true;

    function rowIsEqual(row) {
        return row[0].textContent != "" && (row[0].textContent == row[1].textContent && row[1].textContent == row[2].textContent);
    }

    function primaryDiagonalIsEqual(matrix) {
        return matrix[0][0] != "" && (matrix[0][0] == matrix[1][1] && matrix[1][1] == matrix[2][2]);
    }

    function secondaryDiagonalIsEqual(matrix) {
        return matrix[0][2] != "" && (matrix[0][2] == matrix[1][1] && matrix[1][1] == matrix[2][0]);
    }

    function checkWinner() {
        let board = [...document.querySelectorAll('.row')];
        board.forEach((row) => {
            if(rowIsEqual(row.childNodes)) {
                let winner = (row.childNodes[0].textContent == "X") ? playerOne.name : playerTwo.name;
                console.log(`${winner} won!`);
                this.gameIsActive = false;
                return;
            }

        });

        let domToArrayBoard = [...board.map((row) => row.childNodes).map((node) => [...node])].map((arr) => arr.map((element) => element.textContent));
        if(primaryDiagonalIsEqual(domToArrayBoard) || secondaryDiagonalIsEqual(domToArrayBoard)) {
            let boardCenterPosition = board[1].childNodes[1].textContent;
            let winner = (boardCenterPosition == "X") ? playerOne.name : playerTwo.name;
            console.log(`${winner} won!`);
            this.gameIsActive = false;
            return;
        }
    }

    return { checkWinner, gameIsActive }
}();



const displayController = function() {
    const gameContainer = document.querySelector('.container');
    let gameMark = "X"; 


    function createBoard() {
        gameboard.getBoard().forEach((row) => {
            let boardRow = document.createElement('div');
            boardRow.classList.add("row");
            row.forEach((col) => {
                let boardCol = document.createElement('div');
                boardCol.classList.add('col');
                boardCol.addEventListener('click', (e) => {
                    if(e.target.textContent == "" && game.gameIsActive) {
                        e.target.textContent = gameMark;
                        game.checkWinner();
                        gameMark = (gameMark == "X") ? "O" : "X";
                        
                    }
                })
               
                boardRow.appendChild(boardCol);
            })
            gameContainer.appendChild(boardRow);
        })
    }



    return { createBoard }

}();


displayController.createBoard();






