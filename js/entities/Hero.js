import { Container, Graphics } from "pixi.js";

export default class Hero extends Container{

  #GRAVITY_FORCE = 0.1;
  #MAX_SPEED = 2;
  #velocityX = 0;
  #velocityY = 0;

  #movement = {
    x: 0,
    y: 0,
  }

  #directionContext = {
    left: 0,
    right: 0,
  }

  constructor(){
    super();

    const view = new Graphics();
    view.lineStyle(1, 0xff0000);
    view.drawRect(0,0, 20, 60);

    this.addChild(view);
  }

  update(){
    this.#velocityX = this.#movement.x * this.#MAX_SPEED;
    this.x += this.#velocityX;

    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  startLeftMove(){
    this.#directionContext.left = -1;
    this.#movement.x = -1;
  }

  startRightMove(){
    this.#directionContext.right = 1;
    this.#movement.x = 1;
  }

  stopLeftMove(){
    this.#directionContext.left = 0;
    this.#movement.x = this.#directionContext.right;
  }

  stopRightMove(){
    this.#directionContext.right = 0;
    this.#movement.x = this.#directionContext.left;
  }

  stay(){
    this.#velocityY = 0
  }
}