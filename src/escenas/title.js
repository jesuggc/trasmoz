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
		super({ key: 'title' });
	}

	//Cargamos todos los assets que vamos a necesitar.
	 
	preload(){
		this.load.image('start', 'assets/GUI/start.png');
		this.load.image('title_background', 'assets/title_background.jpg')
		this.load.spritesheet('witch', 'assets/Bruja/bruja_run.png', {frameWidth: 64, frameHeight: 64})
	}
	
	//Creacion de los elementos de la escena principal de juego

	create() {
		
		var back = this.add.image(0, 0, 'title_background').setOrigin(0, 0);
		//Pintamos un boton de Empezar
		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'start')
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		//fullscreen
		this.fullscreenButton = this.add.image(0, 0, 'start', 0).setOrigin(0, 0).setInteractive();
		this.fullscreenButton.setScrollFactor(0,0);
		this.fullscreenButton.setScale(0.3)
		
		// Escuchamos los eventos del raton cuando interactual con nuestro sprite de "Start"
		this.fullscreenButton.on('pointerup', function () {
			if (this.scale.isFullscreen)
			{
				this.scale.stopFullscreen();
			}
			else
			{
				this.game.scale['autoCenter'] = Phaser.Scale.CENTER_BOTH;
				this.game.scale.displaySize['maxWidth'] = 8000;
				this.game.scale.displaySize['maxHeight'] = 8000;
				this.scale.startFullscreen();
			}

		}, this);
		
		this.scale.on('leavefullscreen', function () {
			this.game.scale['autoCenter'] = Phaser.Scale.CENTER_HORIZONTALLY;
				this.game.scale.displaySize['maxWidth'] = 900;
				this.game.scale.displaySize['maxHeight'] = 750;
		}, this);


	    sprite.on('pointerup', () => {
			this.scene.start('animation'); //Cambiamos a la escena de juego
	    });

	}
}