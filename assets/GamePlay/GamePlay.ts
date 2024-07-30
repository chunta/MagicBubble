import { _decorator, Component, Node, Prefab, 
    instantiate, Vec3 } from 'cc';
import { BrickManager } from './BrickManager';
const { ccclass, property } = _decorator;

@ccclass('GamePlayScript')
export class GamePlayScript extends Component {
    @property(Prefab)
    brickManagerPrefab: Prefab | null = null;
    brickManager: Node = null;


    @property
    speed: number = 100;
    start() {
        this.spawnPrefab();
    }

    update(deltaTime: number) {
        console.log(this.speed);
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
              const brickManager = this.brickManager.getComponent(BrickManager);

              if (brickManager) {
                  // You can now access the BrickManager component's properties and methods
                  brickManager.someMethod(); // Example method call
              } else {
                  console.error('BrickManager component not found on new instance.');
              }
        } else {
            console.error('Prefab is not assigned!');
        }
    }
}

