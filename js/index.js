import { Application } from 'pixi.js';
import Game from './Game'

const _pixiApp = new Application({
  width: 1024,
  height: 768,
});

const game = new Game(_pixiApp);
_pixiApp.ticker.add(game.update, game);

document.body.appendChild(_pixiApp.view);

document.addEventListener("keydown", function(key){
  game.onKeyDown(key);
});

document.addEventListener("keyup", function(key){
  game.onKeyUp(key);
});
