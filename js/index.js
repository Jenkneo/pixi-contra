import { Application } from 'pixi.js';
import Game from './Game'

const pixiApp = new Application({
  width: 1024,
  height: 768,
});

const game = new Game(pixiApp);

document.body.appendChild(pixiApp.view);
document.addEventListener("keydown", function(key){
  game.keyboardProcessor.onKeyDown(key);
});
document.addEventListener("keyup", function(key){
  game.keyboardProcessor.onKeyUp(key);
});

pixiApp.ticker.add(game.update, game);