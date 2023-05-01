export default class Win extends Phaser.Scene {
	constructor() {
		super({ key: 'win' });
       
	}
	 
	create() {
		this.defeat = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'winImage').setScrollFactor(0).setInteractive();
		this.defeat.on('pointerup', () => {
			location.reload();
		})
        
	}
}