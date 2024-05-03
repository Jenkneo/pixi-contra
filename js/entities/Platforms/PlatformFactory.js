import Platform from "./Platform";

export default class PlatformFactory{
  #pixiApp;

  constructor(pixiApp){
    this.#pixiApp = pixiApp;
  }

  createPlatform(x, y){
    const platform = new Platform();
    platform.x = x;
    platform.y = y;
    this.#pixiApp.stage.addChild(platform)

    return platform
  }

}