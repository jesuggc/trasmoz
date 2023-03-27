/**
 * @extends Phaser.Scene
 */
export default class Gameover extends Phaser.Scene {
	/**
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'gameover' });
	}
	 

	init(){

	}
	preload(){
		this.load.image('gameoverImage', 'assets/GUI/defeat.png');
	}
	
	create() {
		var windowWidth = this.sys.game.config.width;
		var windowHeight = this.sys.game.config.height;
		this.defeat = this.add.image(windowWidth/2, windowHeight/2, 'gameoverImage').setScrollFactor(0).setInteractive();
		this.defeat.on('pointerup', () => {
			this.scene.launch('animation');
			this.scene.stop()
		})
        
	}
}