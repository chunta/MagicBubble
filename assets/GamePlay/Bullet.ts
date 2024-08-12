import {
  _decorator,
  Component,
  RigidBody,
  PhysicsSystem,
  IPhysics2DContact,
  Vec3,
  Contact2DType,
  Collider2D,
  Graphics,
  Color,
  UITransform,
  CircleCollider2D,
  RigidBody2D,
  Vec2,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
  speed: number = 30;

  onLoad() {
    var collider = this.node.getComponent(CircleCollider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    console.log('onBeginContact ', otherCollider.name);
  }

  update(deltaTime: number) {
    const rigidBody2D = this.node.getComponent(RigidBody2D);
    rigidBody2D.linearVelocity = new Vec2(0, 7);
  }
}
