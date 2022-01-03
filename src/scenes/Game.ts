import { Scene } from 'phaser';
import logo from '@/assets/logo.png';

class Demo extends Scene {
  constructor() {
    super('demo');
  }

  preload = () => {
    this.load.image('logo', logo);
  };

  create = () => {
    const logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
      targets: logo,
      x: 450,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  };
}

export { Demo };
