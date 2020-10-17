export default class Game {
    constructor(widthHeight) {
        this.widthHeight = widthHeight;
        this.dimension = widthHeight * widthHeight;

        // initalize gameboard array
        let gameBoard = [];

        // populate gameboard array with 0's
        for (let i = 0; i < this.dimension; i++) {
            gameBoard[i] = 0;
        }

        // insert two random 2 or 4 tiles
        insertNewTile(gameBoard, this.dimension);
        insertNewTile(gameBoard, this.dimension);

        this.gameState = {
            board: gameBoard,
            score: 0,
            won: false,
            over: false
        } 

        // listeners/list of events to update
        this.moveCallbacks = [];
        this.winCallbacks = [];
        this.loseCallbacks = [];
        

    }

    setupNewGame() {
        let newGame = new Game(this.widthHeight);
        this.gameState = {
            board: newGame.gameState.board,
            score: 0,
            won: false,
            over: false
        }

    }

    loadGame(gameState) {
        this.gameState = gameState;
    }

    move(direction) {
        let idx = 0;
        let validMove;
        let prevGameBoard = [];

        // saves current state of gameboard before shift
        for (let i = 0; i < this.gameState.board.length; i++) {
            prevGameBoard[i] = this.gameState.board[i];
        }
        
        switch(direction) {
            case "right":
                idx = 0;

                for (let i = 0; i < this.widthHeight; i++) {
                    let row = [];
                    for (let j = 0; j < this.widthHeight; j++) {
                        row[j] = this.gameState.board[idx];
                        idx++;
                    }

                    // shifts all non zero numbers to the right
                    let numbersToAdd = shift(row, this.widthHeight, "right");
                    // combines right shifted non zero numbers
                    let combinedRow = combine(numbersToAdd, this.widthHeight, "right", this.gameState);
                    let finishedRow = shift(combinedRow, this.widthHeight, "right");



                    // puts the shifted and combined numbers back into the board
                    let counter = idx - 1;
                    for (let k = this.widthHeight - 1; k >= 0; k--) {
                        this.gameState.board[counter] = finishedRow[k];
                        counter--;
                    }
                }

                // compares gameboards to see if move was valid, returns boolean
                validMove = compare(prevGameBoard, this.gameState.board);
                
                // updates
                if (validMove) {
                    insertNewTile(this.gameState.board, this.dimension);
                    for (let i = 0; i < this.moveCallbacks.length; i++) {
                        let callbackFn = this.moveCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                if (!this.gameState.win) {
                    if (testWin(this)) {
                        for (let i = 0; i < this.winCallbacks.length; i++) {
                            let callbackFn = this.winCallbacks[i];
                            callbackFn(this.gameState);
                        }
                    }
                }
           
                if (testLose(this)) {
                    for (let i = 0; i < this.loseCallbacks.length; i++) {
                        let callbackFn = this.loseCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                break;                        
            case "left":
                idx = 0;

                for (let i = 0; i < this.widthHeight; i++) {
                    let row = [];
                    for (let j = 0; j < this.widthHeight; j++) {
                        row[j] = this.gameState.board[idx];
                        idx++;
                    }

                    // shifts all non zero numbers to the left
                    let numbersToAdd = shift(row, this.widthHeight, "left");
                    // combines left shifted non zero numbers
                    let combinedRow = combine(numbersToAdd, this.widthHeight, "left", this.gameState);
                    let finishedRow = shift(combinedRow, this.widthHeight, "left");

                    // puts the shifted and combined numbers back into the board
                    let counter = idx - 1;
                    for (let k = this.widthHeight - 1; k >= 0; k--) {
                        this.gameState.board[counter] = finishedRow[k];
                        counter--;
                    }
                } 

                // compares gameboards to see if move was valid, returns boolean
                validMove = compare(prevGameBoard, this.gameState.board);
                
                // updates
                if (validMove) {
                    insertNewTile(this.gameState.board, this.dimension);
                    for (let i = 0; i < this.moveCallbacks.length; i++) {
                        let callbackFn = this.moveCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                if (!this.gameState.win) {
                    if (testWin(this)) {
                        for (let i = 0; i < this.winCallbacks.length; i++) {
                            let callbackFn = this.winCallbacks[i];
                            callbackFn(this.gameState);
                        }
                    } 
                }
           
                if (testLose(this)) {
                    for (let i = 0; i < this.loseCallbacks.length; i++) {
                        let callbackFn = this.loseCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                break;
            case "up":
                idx = 0;

                for (let i = 0; i < this.widthHeight; i++) {
                    let row = [];
                    for (let j = 0; j < this.widthHeight; j++) {
                        row[j] = this.gameState.board[i + this.widthHeight * j];
                    }

                    // shifts all non zero numbers up
                    let numbersToAdd = shift(row, this.widthHeight, "up");
                    //combines up shifted non zero numbers
                    let combinedRow = combine(numbersToAdd, this.widthHeight, "up", this.gameState);
                    let finishedRow = shift(combinedRow, this.widthHeight, "up");

                    // puts the shifted and combined numbers back into the board
                    for (let k = 0; k < this.widthHeight; k++) {
                        this.gameState.board[i + this.widthHeight * k] = finishedRow[k];
                    }

                }

                // compares gameboards to see if move was valid, returns boolean
                validMove = compare(prevGameBoard, this.gameState.board);

                // updates
                if (validMove) {
                    insertNewTile(this.gameState.board, this.dimension);
                    for (let i = 0; i < this.moveCallbacks.length; i++) {
                        let callbackFn = this.moveCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                if (!this.gameState.win) {
                    if (testWin(this)) {
                        for (let i = 0; i < this.winCallbacks.length; i++) {
                            let callbackFn = this.winCallbacks[i];
                            callbackFn(this.gameState);
                        }
                    }
                }
           
                if (testLose(this)) {
                    for (let i = 0; i < this.loseCallbacks.length; i++) {
                        let callbackFn = this.loseCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                break;
            case "down":
                idx = 0;
    
                for (let i = 0; i < this.widthHeight; i++) {
                    let row = [];
                    for (let j = 0; j < this.widthHeight; j++) {
                        row[j] = this.gameState.board[i + this.widthHeight * j];
                    }

                    // shifts all non zero numbers down
                    let numbersToAdd = shift(row, this.widthHeight, "down");
                    //combines down shifted non zero numbers
                    let combinedRow = combine(numbersToAdd, this.widthHeight, "down", this.gameState);
                    let finishedRow = shift(combinedRow, this.widthHeight, "down");

                    // puts the shifted and combined numbers back into the board
                    for (let k = 0; k < this.widthHeight; k++) {
                        this.gameState.board[i + this.widthHeight * k] = finishedRow[k];
                    }
                }

                // compares gameboards to see if move was valid, returns boolean
                validMove = compare(prevGameBoard, this.gameState.board);

                // updates
                if (validMove) {
                    insertNewTile(this.gameState.board, this.dimension);
                    for (let i = 0; i < this.moveCallbacks.length; i++) {
                        let callbackFn = this.moveCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                if (!this.gameState.win) {
                    if (testWin(this)) {
                        for (let i = 0; i < this.winCallbacks.length; i++) {
                            let callbackFn = this.winCallbacks[i];
                            callbackFn(this.gameState);
                        }
                    }
                }
           
                if (testLose(this)) {
                    for (let i = 0; i < this.loseCallbacks.length; i++) {
                        let callbackFn = this.loseCallbacks[i];
                        callbackFn(this.gameState);
                    }
                }
                break;
        }
    }

    onMove(callback) {
        // adds callback function "listener" if not already present
        this.moveCallbacks.push(callback);
    }

    onLose(callback) {
        // adds callback function "listener" if not already present
        this.loseCallbacks.push(callback);
    }

    onWin(callback) {
        // adds callback function "listener" if not already present
        this.winCallbacks.push(callback);
    }

    getGameState() {
        return this.gameState;
    }

    toString() {
        let idx = 0;
        for (let i = 0; i < this.widthHeight; i++) {
            let temp = "";
            for (let j = 0; j < this.widthHeight; j++) {
                temp += "[" + this.gameState.board[idx] + "] ";
                if (j == this.widthHeight - 1) {
                    console.log(temp + "\n");
                }

                idx++;
            }

        }

    }

   

}

export function generateRandomTile() {
    let numbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    let idx = Math.floor(Math.random() * numbers.length);
    return numbers[idx];
}

export function tilePlacement(dimension) {  
    return Math.floor(Math.random() * (dimension - 0) + 0); 
} 

export function insertNewTile(board, dimension) {
    // generates random tile 2 or 4
    let tile = generateRandomTile();

    // generates the random place within the board the 2 or 4 will appear
    let tileIdx = tilePlacement(dimension);

    // places new tiles onto board
    if (board[tileIdx] == 0) {
        board[tileIdx] = tile;
    } else {
        while (board[tileIdx] != 0) {
            tileIdx = tilePlacement(dimension);
        }
        board[tileIdx] = tile;
    }
}

export function shift(row, widthHeight, direction) {
    if (direction == "right") {
        let numbersToAdd = row.filter(num => num);
        let toFill = widthHeight - numbersToAdd.length;
        let zeroArr = new Array(toFill).fill(0);
        numbersToAdd = zeroArr.concat(numbersToAdd);
        return numbersToAdd;
    } else if (direction == "left") {
        let numbersToAdd = row.filter(num => num);
        let toFill = widthHeight - numbersToAdd.length;
        let zeroArr = new Array(toFill).fill(0);
        numbersToAdd = numbersToAdd.concat(zeroArr);
        return numbersToAdd;
    } else if (direction == "up") {
        let numbersToAdd = row.filter(num => num);
        let toFill = widthHeight - numbersToAdd.length;
        let zeroArr = new Array(toFill).fill(0);
        numbersToAdd = numbersToAdd.concat(zeroArr);
        return numbersToAdd;
    } else if (direction == "down") {
        let numbersToAdd = row.filter(num => num);
        let toFill = widthHeight - numbersToAdd.length;
        let zeroArr = new Array(toFill).fill(0);
        numbersToAdd = zeroArr.concat(numbersToAdd);
        return numbersToAdd;
        
    }
    
}

export function combine(numbersToAdd, widthHeight, direction, gameState) {
    if (direction == "right") {
        for (let k = widthHeight; k > 0; k--) {
            if (numbersToAdd[k] == numbersToAdd[k - 1]) {
                numbersToAdd[k] += numbersToAdd[k - 1];
                gameState.score += numbersToAdd[k];
                numbersToAdd[k - 1] = 0;
                k--;
            }
        }
        return numbersToAdd; 
    } else if (direction == "left") {
        for (let k = 0; k < widthHeight; k++) {
            if (numbersToAdd[k] == numbersToAdd[k + 1]) {
                numbersToAdd[k] += numbersToAdd[k + 1];
                gameState.score += numbersToAdd[k];
                numbersToAdd[k + 1] = 0;
                k++;
            }
        }
        return numbersToAdd;

    } else if (direction == "up") {
        for (let k = 0; k < widthHeight; k++) {
            if (numbersToAdd[k] == numbersToAdd[k + 1]) {
                numbersToAdd[k] += numbersToAdd[k + 1];
                gameState.score += numbersToAdd[k];
                numbersToAdd[k + 1] = 0;
                k++;
            }
        }
        return numbersToAdd;
    
    } else if (direction == "down") {
        for (let k = widthHeight; k > 0; k--) {
            if (numbersToAdd[k] == numbersToAdd[k - 1]) {
                numbersToAdd[k] += numbersToAdd[k - 1];
                gameState.score += numbersToAdd[k];
                numbersToAdd[k - 1] = 0;
                k--;
            }
        }
        return numbersToAdd; 

    }
}

export function compare(prevGameBoard, currGameBoard) {
    for (let i = 0; i < currGameBoard.length; i++) {
        if (prevGameBoard[i] != currGameBoard[i]) {
            return true;
        }
    }

    return false;

}

export function testWin(game) {
    if (game.gameState.board.includes(2048)) {
        game.gameState.won = true;
        return true;
    } else {
        return false;
    }
}

export function testLose (game) {
    if (game.gameState.board.includes(0)) {
        return false;
    }

    let idx = 0;

    for (let i = 0; i < game.widthHeight; i++) {
        for (let j = 0; j < game.widthHeight; j++) {
            if (j != game.widthHeight - 1 && game.gameState.board[idx] == game.gameState.board[idx + 1]) {
                return false;
            }

            if (i != game.widthHeight - 1 && game.gameState.board[idx] == game.gameState.board[idx + game.widthHeight]) {
                return false;
            }

            idx++;
        }
    }

    game.gameState.over = true;
    return true;
}

