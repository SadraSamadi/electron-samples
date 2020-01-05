import {Sprite} from 'pixi.js';
import Victor from 'victor';

export default class Player {

  public sprite: Sprite;

  public position: Victor;

  public velocity: Victor;

  public acceleration: Victor;

  public constructor(image: string) {
    this.sprite = Sprite.from(image);
    this.position = new Victor(0, 0);
    this.velocity = new Victor(0, 0);
    this.acceleration = new Victor(0, 0);
    this.sprite.anchor.set(0.5);
  }

  public update(delta: number): void {
    let acceleration = this.acceleration.clone()
      .multiplyScalar(delta);
    this.velocity.add(acceleration);
    let velocity = this.velocity.clone()
      .multiplyScalar(delta);
    this.position.add(velocity);
    this.sprite.position.set(this.position.x, this.position.y);
  }

}
