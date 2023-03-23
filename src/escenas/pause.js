/**
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
	/**
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'pause' });
	}
	 
	preload(){
		this.load.image('resume', 'assets/GUI/play_button.png');
        this.load.image('pause_background', 'assets/GUI/pause_background.jpg')
	}

	create() {
		console.log("Entrando en pausa")
		var back = this.add.image(this.sys.game.canvas.width/2, -400, 'pause_background');
        back.setScale(0.7);
        var tween = this.tweens.add({
            targets: back,
            y: 80,
            duration: 1500,
            ease: 'Power2',
            yoyo: false,
            repeat: 0
          });
          tween.on('complete', () => {
              var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'resume')
              sprite.setInteractive();
              sprite.setScale(0.3)
              sprite.on('pointerup', () => {
                  console.log("pulso resume")
                  this.scene.resume('animation'); 
                  this.scene.stop()
              });
          })
		


	}
}