const resetBtn = document.querySelector('.reset-btn');
const winnerAnnouncement = document.querySelector('.winner-announcement');
const modalBtn = document.querySelector('.modal-btn');

const createUser = function(name, mark) {
    function setName(newName) {
        this.name = newName;
    }
    return {name, mark, setName};
}

const game = function() {
    let playerOne = createUser("Player One", "X");
    let playerTwo = createUser("Player Two", "O");
    let gameIsActive = true;
    let playersScore = {
        playerOne: 0,
        playerTwo: 0
    }

    function rowIsEqual(row) {
        return row[0].textContent != "" && (row[0].textContent == row[1].textContent && row[1].textContent == row[2].textContent);
    }

    function columnIsEqual(matrix) {
        let columnEqual = false;
        
        for(let i=0;i<=2; i++) {
            let columnIsEqual = matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i];

            let columnIsNotEmpty = matrix[0][i] != ""; 

            if(columnIsNotEmpty && columnIsEqual) {
                columnEqual = true;
                return columnEqual;
            }
        }

        return false;
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

                displayController.displayWinner(winner);

                let winnerScore = (winner == playerOne.name) ? playersScore.playerOne++ : playersScore.playerTwo++;
                displayController.updateScore();
                displayController.changeRowColor(row);
                
                this.gameIsActive = false;
                
                resetBtn.textContent = "Play Again";
                return;
            }

        });

        // Return an array with all textContent from the boardgame;
        let domToArrayBoard = [...board.map((row) => row.childNodes).map((node) => [...node])].map((arr) => arr.map((element) => element.textContent));

        if(columnIsEqual(domToArrayBoard)) {
            let winner = (displayController.getMark() == "X") ? playerOne.name : playerTwo.name;
            let winnerScore = (winner == playerOne.name) ? playersScore.playerOne++ : playersScore.playerTwo++;
            displayController.updateScore();
            displayController.displayWinner(winner);

            
            this.gameIsActive = false;
            resetBtn.textContent = "Play Again";
        }

        if(primaryDiagonalIsEqual(domToArrayBoard) || secondaryDiagonalIsEqual(domToArrayBoard)) {
            let boardCenterPosition = board[1].childNodes[1].textContent;
            let winner = (boardCenterPosition == "X") ? playerOne.name : playerTwo.name;
            let winnerScore = (winner == playerOne.name) ? playersScore.playerOne++ : playersScore.playerTwo++;
            displayController.updateScore();
            displayController.displayWinner(winner);
            this.gameIsActive = false;
            resetBtn.textContent = "Play Again";
            return;
        }
    }

    function getPlayersScore() { return playersScore; }

  
    return { checkWinner, gameIsActive, getPlayersScore, playerOne, playerTwo }
}();



const displayController = function() {
    const gameContainer = document.querySelector('.container');
    let gameMark = "X"; 
    let board = Array(3).fill().map(() => Array(3).fill(" "));


    function createBoard() {
        board.forEach((row) => {
            let boardRow = document.createElement('div');
            boardRow.classList.add("row");
            row.forEach((col) => {
                let boardCol = document.createElement('div');
                boardCol.classList.add('col');
                boardCol.addEventListener('click', (e) => {
                    if(e.target.textContent == "" && game.gameIsActive) {
                        e.target.textContent = gameMark;
                        game.checkWinner();
                        console.log(gameMark)
                        
                        gameMark = (gameMark == "X") ? "O" : "X";
                        
                    }
                })
               
                boardRow.appendChild(boardCol);
            })
            gameContainer.appendChild(boardRow);
        })
    }

    function resetBoard() {
        let boardCols = document.querySelectorAll('.col');
        boardCols.forEach((col) => {
            col.textContent = "";
            col.style.setProperty('background', 'white');
            col.style.setProperty('color', 'black');
        })

    }

    function getMark() {
        return gameMark;
    }

    function updateScore() {
        document.querySelector('.player-one-score').textContent = game.getPlayersScore().playerOne;

        document.querySelector('.player-two-score').textContent = game.getPlayersScore().playerTwo;

    }


    function displayWinner(winner) {
        winnerAnnouncement.textContent = `${winner} won! 🎉`
    }

    function changeRowColor(row) {
        row.childNodes.forEach((node) => {
            node.style.setProperty('background', '#81B29A')
            node.style.setProperty('color', 'white');
            
        });
    }



    return { createBoard, getMark, resetBoard, updateScore, displayWinner, changeRowColor }

}();

resetBtn.addEventListener('click', () => {
    displayController.resetBoard();
    game.gameIsActive = true;
    winnerAnnouncement.textContent = "";
    resetBtn.textContent = "Restart";
});

modalBtn.addEventListener('click', () => {
    let playerOneInput = document.querySelector('#playerOneName');
    let playerTwoInput = document.querySelector('#playerTwoName');
    let playerOneName = document.querySelector('.player-one-name');
    let playerTwoName = document.querySelector('.player-two-name');
    if(playerOneInput.value != "") {
        game.playerOne.setName(playerOneInput.value);
        playerOneName.textContent = playerOneInput.value; 
    }

    if(playerTwoInput.value != "") {
        game.playerTwo.setName(playerTwoInput.value);
        playerTwoName.textContent = playerTwoInput.value;
    }
})

displayController.createBoard();






