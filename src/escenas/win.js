export default class Win extends Phaser.Scene {
	/**
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'win' });
       
	}
	 
	preload(){
		this.load.image('winImage', 'assets/GUI/victoryMsg.png');
	}

	create() {
		this.defeat = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'winImage').setScrollFactor(0).setInteractive();
		this.defeat.on('pointerup', () => {
			this.scene.launch('animation');
			this.scene.stop()
		})
        
	}
}