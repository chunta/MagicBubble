import { _decorator, Color, Component, Graphics, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Brick')
export class Brick extends Component {
    start() {

    }

    onLoad () {
        // Get the bounding box of the node
        var transform = this.node.getComponent(UITransform);
        let boundingBox = transform.getBoundingBox();

        // Get the Graphics component
        let graphics = this.getComponent(Graphics);
        
        // Set the line color and width
        graphics.lineWidth = 2;
        graphics.strokeColor = Color.RED;

        // Draw the bounding box
        graphics.rect(boundingBox.xMin, boundingBox.yMin, boundingBox.width, boundingBox.height);
        graphics.stroke();
    }
}

