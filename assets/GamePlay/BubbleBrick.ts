import {
  _decorator,
  Color,
  Component,
  Graphics,
  UITransform,
} from 'cc';
const { ccclass } = _decorator;
import { ColorEnum } from './BubbleColorEnum';

@ccclass('BubbleBrick')
export class BubbleBrick extends Component {
  chosenBubbleType: ColorEnum = ColorEnum.Blue;

  start() {}

  onLoad() {
    // Get the bounding box of the node
    var transform = this.node.getComponent(UITransform);
    let boundingBox = transform.getBoundingBox();

    // Get the Graphics component
    let graphics = this.getComponent(Graphics);

    // Set the line color and width
    graphics.lineWidth = 2;
    graphics.strokeColor = Color.RED;

    // Draw the bounding box
    graphics.rect(
      boundingBox.xMin,
      boundingBox.yMin,
      boundingBox.width,
      boundingBox.height
    );
    graphics.stroke();

    this.diceBubble();
  }

  private diceBubble() {
    var nodes = this.node.children;
    this.chosenBubbleType = this.getRandomColorEnum();
    for (var i = 0; i < nodes.length; i++) {
      console.log(nodes[i].name);
      console.log(this.chosenBubbleType.toString());
      if (nodes[i].name.indexOf(this.chosenBubbleType.toString()) >= 0) {
        nodes[i].active = true;
      } else {
        nodes[i].active = false;
      }
    }
  }

  private getRandomColorEnum(): ColorEnum {
    const enumValues = [ColorEnum.Blue, ColorEnum.Purple, ColorEnum.Red];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }
}
