import {
  _decorator,
  Component,
  Prefab,
  instantiate,
  Vec3,
  Size,
  screen,
  UITransform,
  view,
} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('BubbleBrickManager')
export class BubbleBrickManager extends Component {
  @property(Prefab)
  brickPrefab: Prefab | null = null;

  private windowSize: Size = Size.ZERO;

  private col: number = 6;
  private row: number = 3;

  start() {
    const screenSize = view.getVisibleSize();
    console.log(`Screen Size: ${screenSize.width} x ${screenSize.height}`);

    this.windowSize = screen.windowSize;
    console.log(
      `Window Size: ${this.windowSize.width} x ${this.windowSize.height}`
    );

    if (this.brickPrefab) {
      this.spawnBricks(
        this.row,
        this.col,
        new Size(screenSize.width / this.col, screenSize.width / this.col),
        -screenSize.width / 2,
        screenSize.height / 2
      );
    } else {
      console.error('Brick prefab not loaded');
    }
  }

  spawnBricks(
    row: number,
    col: number,
    size: Size,
    startX: number,
    startY: number
  ) {
    const { width, height } = size;
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        const brickNode = instantiate(this.brickPrefab);
        const transform = brickNode.getComponent(UITransform);
        if (transform) {
          transform.setContentSize(size);
        }

        // Find the Canvas node in the scene
        const canvasNode = this.node.scene.getChildByName('Canvas');

        brickNode.setParent(canvasNode);
        brickNode.setPosition(
          new Vec3(
            startX + c * width + width / 2,
            startY - height * r - height / 2,
            0
          )
        );
        const sprites = brickNode.children;
        for (let s = 0; s < sprites.length; s++) {
            const sprite = sprites[s];
            const transform = sprite.getComponent(UITransform);
            transform.setContentSize(size);
        }
      }
    }
  }

  someMethod() {
    console.log('someMethod is called');
  }
}
