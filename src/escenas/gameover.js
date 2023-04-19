export default class Gameover extends Phaser.Scene {
	/**
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'gameover' });
	}
	 
	preload(){
		this.load.image('gameoverImage', 'assets/GUI/defeat.png');
	}

	create() {
		this.defeat = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'gameoverImage').setScrollFactor(0).setInteractive();
		this.defeat.on('pointerup', () => {
			this.scene.launch('animation');
			this.scene.stop()
		})
        
	}
}