/**
 * Escena de Titulo.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'pause' });
	}

	//Cargamos todos los assets que vamos a necesitar
	 
	preload(){
		this.load.image('resume', 'assets/GUI/play_button.png');
        this.load.image('pause_background', 'assets/GUI/pause_background.jpg')
	}
	//TODO #3
	//Creacion de los elementos de la escena principal de juego

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
              //Pintamos un boton de Empezar
              var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'resume')
              sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
              sprite.setScale(0.3)
              sprite.on('pointerup', () => {
                  console.log("pulso resume")
                  this.scene.resume('animation'); //Cambiamos a la escena de juego
                  this.scene.stop()
              });
          })
		


	}
}