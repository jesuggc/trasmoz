/**
 * @extends Phaser.Scene
 */
export default class LevelUp extends Phaser.Scene {
	/**
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'levelUp' });
	}
	 
	preload(){
		
	}

	create() {
		console.log("Entrando en level up");
        var width = this.sys.game.canvas.width;
		this.add.rectangle(80,80,300,600,0xffffff).setInteractive();
        
		


	}
}