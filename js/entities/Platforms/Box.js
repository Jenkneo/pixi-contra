import { Container, Graphics } from "pixi.js";

export default class Box extends Container{

  type = "box";

  constructor(){
    super();
    
    const view = new Graphics();
    view.lineStyle(1, 0xff0000);
    view.drawRect(0,0, 200, 30);
    view.lineTo(200, 30);

    this.addChild(view);
  }
}