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

	//Cargamos todos los assets que vamos a necesitar
	 
	preload(){
		this.load.image('play', 'assets/GUI/playButton1.png');
		this.load.image('play2', 'assets/GUI/playButton2.png');
		this.load.image('exit', 'assets/GUI/exitButton1.png');
		this.load.image('exit2', 'assets/GUI/exitButton2.png');
		this.load.image('sound', 'assets/GUI/soundButton1.png');
		this.load.image('sound2', 'assets/GUI/soundButton2.png');
		this.load.image('fullscreen', 'assets/GUI/fullscreenButton1.png');
		this.load.image('fullscreen2', 'assets/GUI/fullscreenButton2.png');
		this.load.image('title_background', 'assets/title_background.jpg')
		this.load.spritesheet('witch', 'assets/Bruja/bruja_run.png', {frameWidth: 64, frameHeight: 64})
	}
	
	//Creacion de los elementos de la escena principal de juego

	create() {
		
		var back = this.add.image(0, 0, 'title_background').setOrigin(0, 0);
		//Pintamos un boton de Empezar
		this.playButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/4, 'play').setInteractive();
		this.fullscreenButton = this.add.image(this.sys.game.canvas.width/9.9, this.sys.game.canvas.height/1.25, 'fullscreen').setInteractive();
		this.fullscreenButton.setScrollFactor(0,0);
		this.fullscreenButton = this.add.image(this.sys.game.canvas.width/1.1, this.sys.game.canvas.height/1.25, 'sound').setInteractive();
		
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