export default class GameView {
    constructor(model) {
        this.model = model;

    }

    // creates tiles on the board and inserts the gameboard values
    createGameBoard() { 
        let idx = 0;
        for (let i = 0; i < this.model.widthHeight; i++) {
            const $row = $('#row' + [i]);
            for (let j = 0; j < this.model.widthHeight; j++) {
                let tileVal;
                if (this.model.gameState.board[idx] == 0) {
                    tileVal = "";
                } else {
                    tileVal = this.model.gameState.board[idx];
                }
                let tile = 
                `<div class="tile is-parent">
                    <div id="tile${idx}" class="tile is-child box tile-size tile-content">
                        ${tileVal}
                    </div>
                </div>`

                $row.append(tile);
               
                idx++;
            }
        }
    }

    // updates values in the board
    refreshGameBoard() {
        let idx = 0;
        for (let i = 0; i < this.model.widthHeight; i++) {
            for (let j = 0; j < this.model.widthHeight; j++) {
                if (this.model.gameState.board[idx] == 0) {
                    $('#tile' + [idx]).text("");
                } else {
                    $('#tile' + [idx]).text(this.model.gameState.board[idx]);
                }

                switch (this.model.gameState.board[idx]) {
                    case 2:
                        $(`#tile${idx}`).css({'background-color': '#fef8e4', 'color': '#675c63'});
                    break;
                    case 4:
                        $(`#tile${idx}`).css({'background-color': '#FDECBB', 'color': '#675c63'});
                    break;
                    case 0:
                        $(`#tile${idx}`).css({'background-color': 'white'});
                    break;
                    case 8:
                        $(`#tile${idx}`).css({'background-color': '#fbde88', 'color': '#675c63'});
                    break;
                    case 16:
                        $(`#tile${idx}`).css({'background-color': '#F3C69A', 'color': 'white'});
                    break;
                    case 32:
                        $(`#tile${idx}`).css({'background-color': '#edab6a', 'color': 'white'});
                        
                    break;
                    case 64:
                        $(`#tile${idx}`).css({'background-color': '#E98D79', 'color': 'white'});
                        
                    break;
                    case 128:
                        $(`#tile${idx}`).css({'background-color': '#619F9B', 'color': 'white'});
                    break;
                    case 256:
                        $(`#tile${idx}`).css({'background-color': '#77aca9', 'color': 'white'});
                    break;
                    case 512:
                        $(`#tile${idx}`).css({'background-color': '#9DC1BE', 'color': 'white'});
                    break;
                    case 1024:
                        $(`#tile${idx}`).css({'background-color': '#c5b1c1', 'color': 'white'});
                    break;
                    case 2048:
                        $(`#tile${idx}`).css({'background-color': '#926d8b', 'color': 'white'});
                    break;
                    default:
                        $(`#tile${idx}`).css({'background-color': '#926d8b', 'color': 'white'});
                    break;
                    // $(`#tile${idx}`).css({'background-color': '#68e8e5'});   
                    // $(`#tile${idx}`).css({'background-color': '#1fcdca'});
                    // $(`#tile${idx}`).css({'background-color': '#1aadaa'});
                }

                idx++;
            }
        }

        // updates score
        $('.score').text(this.model.gameState.score);
    }

    loadGameState() {
        let gameState =
        `<h3 class="title is-3">game board</h3>
        <button class="button button-colors-2">[${this.model.gameState.board}]</button>
        <h3 class="title is-3"></h3>
        <h3 class="title is-3">score</h3>
        <button class="button button-colors-2">${this.model.gameState.score}</button>
        <h3 class="title is-3"></h3>
        <h3 class="title is-3">did you win?</h3>
        <button class="button button-colors-2">${this.model.gameState.won}</button>
        <h3 class="title is-3"></h3>
        <h3 class="title is-3">is the game over?</h3>
        <button class="button button-colors-2">${this.model.gameState.over}</button>`

        $('#gamestate').html(gameState);
    }
}




