import { _decorator, Component, Prefab, instantiate, Vec3, Size, screen, UITransform } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('BrickManager')
export class BrickManager extends Component {
    @property(Prefab)
    brickPrefab: Prefab | null = null;

    private windowSize: Size = Size.ZERO;

    start() {
        this.windowSize = screen.windowSize;
        console.log(`Window Size: ${this.windowSize.width} x ${this.windowSize.height}`);

        if (this.brickPrefab) {
            this.spawnBricks(6, new Size(640 / 6, 640 / 6), -320);
        } else {
            console.error('Brick prefab not loaded');
        }
    }

    spawnBricks(count: number, size: Size, startX: number) {
        const { width } = size;

        for (let i = 0; i < count; i++) {
            const brickNode = instantiate(this.brickPrefab);
            const transform = brickNode.getComponent(UITransform);
            if (transform) {
                transform.setContentSize(size);
            }

            brickNode.setParent(this.node);
            brickNode.setPosition(new Vec3(startX + i * width + width / 2, 0, 0));
        }
    }

    someMethod() {
        console.log('someMethod is called');
    }
}
