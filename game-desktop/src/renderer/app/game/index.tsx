import {injectable} from 'inversify';
import {Application, Container, Graphics, Sprite, TilingSprite} from 'pixi.js';
import {boundMethod} from 'autobind-decorator';
import Player from './player';
import blue from './blue.png';
import player_ship_1_blue from './player_ship_1_blue.png';

@injectable()
export default class Game {

  private container: HTMLDivElement;

  private app: Application;

  private graphics: Graphics;

  private background: Sprite;

  private player: Player;

  public start(container: HTMLDivElement): void {
    this.container = container;
    this.app = new Application({
      antialias: true,
      resizeTo: this.container
    });
    this.container.appendChild(this.app.view);
    this.graphics = new Graphics();
    this.app.stage.addChild(this.graphics);
    this.create(this.app.stage);
    this.app.ticker.add(delta => {
      this.render(this.graphics);
      this.update(delta);
    });
    this.register();
  }

  private create(stage: Container): void {
    this.background = TilingSprite.from(blue);
    stage.addChild(this.background);
    this.player = new Player(player_ship_1_blue);
    this.player.position.x = this.app.renderer.width / 2;
    this.player.position.y = this.app.renderer.height / 2;
    stage.addChild(this.player.sprite);
  }

  private register(): void {
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }

  @boundMethod
  private keydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowLeft':
        this.player.acceleration.x = -0.1;
        break;
      case 'ArrowUp':
        this.player.acceleration.y = -0.1;
        break;
      case 'ArrowRight':
        this.player.acceleration.x = 0.1;
        break;
      case 'ArrowDown':
        this.player.acceleration.y = 0.1;
        break;
    }
  }

  @boundMethod
  private keyup(event: KeyboardEvent): void {
    this.player.acceleration.zero();
    this.player.velocity.zero();
  }

  private render(graphics: PIXI.Graphics): void {
  }

  private update(delta: number): void {
    this.background.width = this.app.renderer.width;
    this.background.height = this.app.renderer.height;
    this.player.sprite.rotation += 0.1 * delta;
    this.player.update(delta);
  }

  public stop(): void {
    window.removeEventListener('keyup', this.keyup);
    window.removeEventListener('keydown', this.keydown);
    this.app.destroy();
  }

}
