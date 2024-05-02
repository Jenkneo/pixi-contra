import { Container, Graphics } from "pixi.js";

export default class Hero extends Container{

  #GRAVITY_FORCE = 0.1;
  #velocityX = 0;
  #velocityY = 0;

  constructor(){
    super();
    const view = new Graphics();

    view.lineStyle(1, 0xff0000);
    view.drawRect(0,0, 20, 60);

    this.addChild(view);
  }

  update(){
    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  stay(){
    this.#velocityY = 0
  }
}