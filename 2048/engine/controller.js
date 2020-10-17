export default class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // when state changes update
        model.onMove(gameState => {
            view.loadGameState();
        });

        model.onLose(gameState => {
            view.refreshGameBoard();
            view.loadGameState();
            $('#lose-popup').css({"display": "block"});
        });

        model.onWin(gameState => {
            if (!$('#win-popup').hasClass('won')) {
                view.refreshGameBoard();
                view.loadGameState();
                $('#win-popup').css({"display": "block"});
                $('#win-popup').addClass('won');
            }
            view.refreshGameBoard();
            view.loadGameState();
        });

        $(window).on('keydown', function(key) {
            switch (key.which) {
                case 39:
                    model.move('right');
                    view.refreshGameBoard();
                    break;
                case 37:
                    model.move('left');
                    view.refreshGameBoard();
                    break;
                case 40:
                    model.move('down'); 
                    view.refreshGameBoard();
                    break;
                case 38:
                    model.move('up');
                    view.refreshGameBoard();
                    break;
            }
        })

        // on reset button click create a new game and update gameboard with new game
        $('#reset-button').on('click', function() {
            model.setupNewGame();
            view.refreshGameBoard();
            view.loadGameState();
        });

        $('#try-again-button').on('click', function() {
            $('#lose-popup').css({"display": "none"});
            model.setupNewGame();
            view.refreshGameBoard();
            view.loadGameState();
        });

        $('#continue-button').on('click', function() {
            $('#win-popup').css({"display": "none"});
            view.loadGameState();
        });

        $('#how-to-button').on('click', function() {
            $('#how-to-popup').css({"display": "block"});
        });

        $('#play-button').on('click', function() {
            $('#how-to-popup').css({"display": "none"});
        });

        $('#let-me-win-button').on('click', function() {
            model.gameState.board = [0,0,0,0,0,0,0,0,0,0,0,1024,0,0,0,1024];
            model.gameState.score = 0;
            model.gameState.won = false;
            model.gameState.over = false;
            
            if ($('#win-popup').hasClass('won')) {
                $('#win-popup').removeClass('won');
            };
           
            view.refreshGameBoard();
            view.loadGameState();
            
        });
    }
}