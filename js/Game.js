import Hero from "./entities/Hero";
import Platform from "./entities/Platforms/Platform";
import KeyboardProcessor from "./KeyboardProcessor";
import PlatformFactory from "./entities/Platforms/PlatformFactory";

export default class Game{
  
  #pixiApp;
  #hero;
  #platforms = [];

  keyboardProcessor;

  constructor(pixiApp){
    this.#pixiApp = pixiApp;

    this.#hero = new Hero();
    this.#hero.x = 100;
    this.#hero.y = 100;
    this.#pixiApp.stage.addChild(this.#hero)

    const platformFactory = new PlatformFactory(this.#pixiApp);

    const box = platformFactory.createBox(400, 708)
    box.isStep = true

    this.#platforms.push(
      platformFactory.createPlatform(100, 400), 
      platformFactory.createPlatform(300, 400), 
      platformFactory.createPlatform(500, 400),
      platformFactory.createPlatform(700, 400), 
      platformFactory.createPlatform(900, 400), 
      platformFactory.createPlatform(300, 550), 
      platformFactory.createBox(0, 738), 
      platformFactory.createBox(200, 738), 
      box
    )

    this.keyboardProcessor = new KeyboardProcessor(this);
    this.setKeys();

  }

  update(){
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y
    }

    this.#hero.update();

    for (let i = 0; i < this.#platforms.length; i++){

      if (this.#hero.isJumpState() && this.#platforms[i].type != "box"){
        continue;
      }

      const collisionResult = this.getPlatformCollisionResult(this.#hero, this.#platforms[i], prevPoint)
      if (collisionResult.vertical){
        this.#hero.stay(this.#platforms[i].y);
      }
    }
  }

  getPlatformCollisionResult(character, platform, prevPoint){
    const collisionResult = this.getOrientCollisionResult(character.getRect(), platform, prevPoint)

    if (collisionResult.vertical){
      character.y = prevPoint.y
    }

    if (collisionResult.horizontal && platform.type == "box"){
      if (platform.isStep){
        character.stay(platform.y);
      }
      character.x = prevPoint.x;
    }

    return collisionResult;
  }

  getOrientCollisionResult(aaRect, bbRect, aaPrevPoint){
    const collisionResult = {
      vertical: false,
      horizontal: false,
    }

    if (!this.isCollision(aaRect, bbRect)){
      return collisionResult;
    }

    aaRect.y = aaPrevPoint.y;
    if (!this.isCollision(aaRect, bbRect)){
      
      collisionResult.vertical = true;
      return collisionResult;
    }

    collisionResult.horizontal = true;
    return collisionResult;
  }
  
  isCollision(entity, area){
    if (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    ){
      return true;
    }
  }
  
  setKeys(){
    this.keyboardProcessor.getButton("KeyS").executeDown = function(){
      if (this.keyboardProcessor.isButtonPressed("ArrowDown")){
        this.#hero.throwDown();
      }
      else {
        this.#hero.jump()
      }
    };
    this.keyboardProcessor.getButton("ArrowLeft").executeDown = function(){
      this.#hero.startLeftMove()
    };
    this.keyboardProcessor.getButton("ArrowLeft").executeUp = function(){
      this.#hero.stopLeftMove()
    };
    this.keyboardProcessor.getButton("ArrowRight").executeDown = function(){
      this.#hero.startRightMove()
    };
    this.keyboardProcessor.getButton("ArrowRight").executeUp = function(){
      this.#hero.stopRightMove()
    };
  }
}
