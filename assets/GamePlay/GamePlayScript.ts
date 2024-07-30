import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property
    speed: number = 100;
    start() {

    }

    update(deltaTime: number) {
        // Move the node horizontally by speed * deltaTime units per second
        this.node.setPosition(this.node.position.x + this.speed * deltaTime, this.node.position.y)
    }
}

