export default class KeyboardProcessor{

  #keyMap = {
    KeyS: {
      isDown: false
    },
    KeyA: {
      isDown: false
    },
    ArrowLeft: {
      isDown: false
    },
    ArrowRight: {
      isDown: false
    },
    ArrowUp: {
      isDown: false
    },
    ArrowDown: {
      isDown: false
    },
  }

  #gameContext
  
  constructor(gameContext){
    this.#gameContext = gameContext;
  }

  getButton(keyName){
    return this.#keyMap[keyName];
  }

  onKeyDown(key){
    const button = this.#keyMap[key.code];
    if (button != undefined){
      if (button.hasOwnProperty("executeDown")){
        button.executeDown.call(this.#gameContext);
      }
      button.isDown = true;
    }
  }

  onKeyUp(key){
    const button = this.#keyMap[key.code];
    if (button != undefined){
      if (button.hasOwnProperty("executeUp")){
        button.executeUp.call(this.#gameContext);
      }
      button.isDown = false;
    }
  }

  isButtonPressed(keyName){
    return this.#keyMap[keyName].isDown;
  }
}