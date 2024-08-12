import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Vec3,
  macro,
  view,
  Vec2,
  UITransform,
  Size,
  rendering,
} from 'cc';
import { BubbleBrickManager } from './BubbleBrickManager';
import { screen } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePlayScript')
export class GamePlayScript extends Component {
  @property(Prefab)
  brickManagerPrefab: Prefab | null = null;

  brickManager: Node = null;

  @property(Prefab)
  shooterPrefab: Prefab = null;

  shooter: Node = null;

  @property
  speed: number = 100;

  start() {
    this.spawnPrefab();
    this.spawnShooter();
  }

  onLoad() {
    screen.on('window-resize', this.onWindowResize, this);
    screen.on('orientation-change', this.onOrientationChange, this);
    screen.on('fullscreen-change', this.onFullScreenChange, this);
  }

  onDestroy() {
    // Unregister event listeners when the component is destroyed
    screen.off('window-resize', this.onWindowResize, this);
    screen.off('orientation-change', this.onOrientationChange, this);
    screen.off('fullscreen-change', this.onFullScreenChange, this);
  }

  onWindowResize(width: number, height: number) {
    console.log('Window resized:', width, height);
  }

  onOrientationChange(orientation: number) {
    if (
      orientation === macro.ORIENTATION_LANDSCAPE_LEFT ||
      orientation === macro.ORIENTATION_LANDSCAPE_RIGHT
    ) {
      console.log('Orientation changed to landscape:', orientation);
    } else {
      console.log('Orientation changed to portrait:', orientation);
    }
  }

  onFullScreenChange(width: number, height: number) {
    console.log('Fullscreen change:', width, height);
  }

  spawnPrefab() {
    if (this.brickManagerPrefab) {
      // Instantiate the prefab
      this.brickManager = instantiate(this.brickManagerPrefab);

      // Set the parent of the new instance to this node or another node
      this.brickManager.parent = this.node;

      // Optionally, set the position or other properties of the new instance
      this.brickManager.setPosition(new Vec3(0, 0, 0));

      // Get the script component from the new instance
      const bubbleBrickManager =
        this.brickManager.getComponent(BubbleBrickManager);

      if (bubbleBrickManager) {
        // You can now access the BrickManager component's properties and methods
        bubbleBrickManager.someMethod(); // Example method call
      } else {
        console.error('BrickManager component not found on new instance.');
      }
    } else {
      console.error('Prefab is not assigned!');
    }
  }

  spawnShooter() {
    if (this.shooterPrefab) {
      this.shooter = instantiate(this.shooterPrefab);

      const screenSize = view.getVisibleSize();

      const size = new Size(screenSize.width / 6, screenSize.width / 6 / 6);

      const position = new Vec3(
        screenSize.width / 6 - size.width / 2,
        -screenSize.height / 2 + size.height / 2,
        0
      );

      this.shooter.setPosition(position);

      const transform = this.shooter.getComponent(UITransform);

      transform.setContentSize(size);

      this.shooter.parent = this.node;
    }
  }
}
