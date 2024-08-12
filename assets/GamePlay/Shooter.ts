import {
  _decorator,
  Component,
  input,
  Input,
  instantiate,
  KeyCode,
  Prefab,
  Size,
  UITransform,
  Vec3,
  view,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Shooter')
export class Shooter extends Component {
  @property(Prefab)
  bulletPrefab: Prefab | null = null;

  private coolDown: number = 0;
  private allowedKeyAction: boolean = false;

  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  update(deltaTime: number) {
    this.coolDown = this.coolDown + deltaTime;
    this.allowedKeyAction = this.coolDown > 0.3;
  }

  onKeyDown(event) {
    if (this.allowedKeyAction) {
      switch (event.keyCode) {
        case KeyCode.ARROW_LEFT:
          console.log('Left arrow key pressed');
          this.coolDown = 0;
          this.moveLeftOrRight(-1);
          break;
        case KeyCode.ARROW_RIGHT:
          console.log('Right arrow key pressed');
          this.coolDown = 0;
          this.moveLeftOrRight(1);
          break;
        case KeyCode.SPACE:
          console.log('Space key pressed');
          this.coolDown = 0;
          this.spawnBullet();
          break;
        case KeyCode.KEY_C:
          console.log('C key pressed');
          this.coolDown = 0;
          break;
      }
    }
  }

  spawnBullet() {
    const bulletNode = instantiate(this.bulletPrefab);
    var transform = this.node.getComponent(UITransform);
    var size = transform.contentSize;
    var bulletSize = new Size(100, 100);
    var position = new Vec3(
      this.node.getPosition().x,
      this.node.getPosition().y + bulletSize.height / 2 + size.height / 2,
      0
    );
    bulletNode.setPosition(position);
    var bulletTransform = bulletNode.getComponent(UITransform);
    bulletTransform.setContentSize(bulletSize);

    // Find the Canvas node in the scene
    const canvasNode = this.node.scene.getChildByName('Canvas');

    bulletNode.parent = canvasNode;
  }

  moveLeftOrRight(direction: number) {
    var transform = this.node.getComponent(UITransform);
    var size = transform.contentSize;
    var w = size.width;
    var position = this.node.getPosition();
    position.x += direction * w;
    const screenSize = view.getVisibleSize();
    if (
      position.x < -screenSize.width / 2 ||
      position.x > screenSize.width / 2
    ) {
      console.log('hit boundary');
      return;
    }
    this.node.setPosition(position);
  }
}
