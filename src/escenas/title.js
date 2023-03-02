/**
 * Escena de Título.
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

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		this.load.image('start', 'assets/GUI/start.png');
		this.load.image('castle', 'assets/castle.gif');
		this.load.spritesheet('knight', 'assets/Knight/knight.png', {frameWidth: 72, frameHeight: 86})
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		
		//Pintamos un fondo
		var back = this.add.image(0, 0, 'castle').setOrigin(0, 0);
		
		//Pintamos un botón de Empezar
		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'start')
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		//fullscreen
		this.fullscreenButton = this.add.image(0, 0, 'fullscreen', 0).setOrigin(0, 0).setInteractive();
		this.fullscreenButton.setScale(0.05);
		this.fullscreenButton.setScrollFactor(0,0);
		
		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
		this.fullscreenButton.on('pointerup', function () {

			if (this.scale.isFullscreen)
			{
			  this.fullscreenButton.setFrame(0);

				this.scale.stopFullscreen();
			}
			else
			{
			  this.fullscreenButton.setFrame(1);

				this.scale.startFullscreen();
			}

		}, this);
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('animation'); //Cambiamos a la escena de juego

	    });

		sprite.on('pointerover', () => {
			console.log("hola")
	    });

	    sprite.on('pointerout', () => {
			console.log("adios")
	    });

	}
}