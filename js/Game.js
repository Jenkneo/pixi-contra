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

    this.#platforms.push(
      platformFactory.createPlatform(50, 400), 
      platformFactory.createPlatform(200, 450), 
      platformFactory.createPlatform(400, 400)
    )

    this.keyboardProcessor = new KeyboardProcessor(this);
    this.keyboardProcessor.getButton("KeyS").executeDown = function(){
       this.#hero.jump()
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

  update(){
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y
    }

    this.#hero.update();

    for (let i = 0; i < this.#platforms.length; i++){
      const collisionResult = this.getPlatformCollisionResult(this.#hero, this.#platforms[i], prevPoint)
      if (collisionResult.vertical){
        this.#hero.stay();
      }
    }
  }

  getPlatformCollisionResult(character, platform, prevPoint){
    const collisionResult = {
      vertical: false,
      horizontal: false,
    }

    if (!this.isCollision(character, platform)){
      return collisionResult;
    }

    const currY = character.y;
    character.y = prevPoint.y;
    if (!this.isCollision(character, platform)){
      character.stay();
      collisionResult.vertical = true;
      return collisionResult;
    }

    character.y = currY;
    character.x = prevPoint.x;
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
}
