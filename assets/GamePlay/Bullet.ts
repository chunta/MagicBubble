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
  onLoad() {
    var collider = this.node.getComponent(CircleCollider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    // Schedule self-destruction after 10 seconds
    this.scheduleOnce(() => {
      if (this.node && this.node.isValid) {
        this.node.destroy();
      }
    }, 10);
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    console.log('onBeginContact ', otherCollider.name);
    selfCollider.enabled = false;
    otherCollider.enabled = false;
    // Schedule the destruction for the next frame
    this.scheduleOnce(() => {
      if (this.node && this.node.isValid) {
        this.node.destroy();
      }
      if (otherCollider.node && otherCollider.node.isValid) {
        otherCollider.node.destroy();
      }
    }, 0);
  }

  update(deltaTime: number) {
    const rigidBody2D = this.node.getComponent(RigidBody2D);
    if (rigidBody2D) {
      rigidBody2D.linearVelocity = new Vec2(0, 11);
    }
  }

  onDestroy() {
    console.log('Bullet destroyed');
  }
}
