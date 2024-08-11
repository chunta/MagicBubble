import { _decorator, Component, Node, Prefab,
    instantiate, Vec3, 
    Size,
    Sprite} from 'cc';
    import { screen } from "cc";
    import { UITransform } from "cc";

const { ccclass, property } = _decorator;

@ccclass('BrickManager')
export class BrickManager extends Component {
    @property(Prefab)
    brickPrefab: Prefab | null = null;

    brickNode: Node = null;

    time: Number = 0.0;

    size: Size = Size.ZERO;

    start() {
        this.size = screen.windowSize;
        console.log(screen.windowSize);
        var w = 640 / 6;
        var h = w;
        if (this.brickPrefab) {
            for (var i = 0; i < 6; i++) {
                var tmpBrickNode = instantiate(this.brickPrefab);
                var transform = tmpBrickNode.getComponent(UITransform);
                tmpBrickNode.parent = this.node;
                transform.setContentSize(new Size(w, h));
                console.log(i * w);
                tmpBrickNode.setPosition(new Vec3(-320 + i * w + w / 2, 0, 0));
            }

        } else {
            console.log('X- loaded brickPrefab');
        }
    }

    update(deltaTime: number) {
        
    }

    someMethod() {
        console.log('someMethod is called');
    }
}

