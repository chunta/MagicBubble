import { _decorator, Component, Node, Size, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
  speed: number = 200;

  update(deltaTime: number) {
    var position = this.node.getPosition();
    position.y += this.speed * deltaTime;
    this.node.setPosition(position);
  }
}
