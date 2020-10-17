import Game from "./game.js";
import GameView from "./view.js"
import GameController from "./controller.js"

let model;
let view;
let controller;

// start the game when page loads
$(function() {
    model = new Game(4);
    view = new GameView(model);
    controller = new GameController(model, view);

    //creates gameboard
    view.createGameBoard();
    view.refreshGameBoard();
    
    // loads gameState
    view.loadGameState();
    
});

