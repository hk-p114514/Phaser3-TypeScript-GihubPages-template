import 'phaser';
import sky from '@/images/assets/sky.png';
import ground from '@/images/assets/ground.png';
import star from '@/images/assets/star.png';
import bomb from '@/images/assets/bomb.png';
import dude from '@/images/assets/dude.png';
import { Types } from 'phaser';

const components = new Map([
  ['sky', sky],
  ['ground', ground],
  ['star', star],
  ['bomb', bomb],
]);

let player: Types.Physics.Arcade.SpriteWithDynamicBody;

class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  preload() {
    const keys = components.keys();
    for (const key of keys) {
      this.load.image(key, components.get(key));
    }

    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    // プレイヤーの作成
    player = this.physics.add.sprite(100, 450, 'dude');

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 550, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // player move
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(player, platforms);

    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {});
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Main,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

export { game, Main };
