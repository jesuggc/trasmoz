/**
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
	/**
	 * 	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'title' });
	}
	 
	preload(){
		this.load.image('play', 'assets/GUI/playButton1.png');
		this.load.image('play2', 'assets/GUI/playButton2.png');
		this.load.image('credits', 'assets/GUI/creditsButton1.png');
		this.load.image('credits2', 'assets/GUI/creditsButton2.png');
		this.load.image('options', 'assets/GUI/optionsButton1.png');
		this.load.image('options2', 'assets/GUI/optionsButton2.png');
		this.load.image('sound', 'assets/GUI/soundButton1.png');
		this.load.image('sound2', 'assets/GUI/soundButton2.png');
		this.load.image('fullscreen', 'assets/GUI/fullscreenButton1.png');
		this.load.image('fullscreen2', 'assets/GUI/fullscreenButton2.png');
		this.load.image('title_background', 'assets/title_background.jpg')
		this.load.audio('titleSoundtrack', 'assets/soundtrack/title_soundtrack.wav')
		this.load.spritesheet('witch', 'assets/Bruja/bruja_run.png', {frameWidth: 64, frameHeight: 64})
	}
	
	//Creacion de los elementos de la escena principal de juego

	create() {
		
		const config = {
            mute: false,
            volume: 0.15,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
			//pauseOnBlur : false,
            delay: 0,
          }; 
          
        this.soundTitle = this.sound.add("titleSoundtrack", config);
		this.soundTitle.play()

		var back = this.add.image(0, 0, 'title_background').setOrigin(0, 0);
		//Pintamos un boton de Empezar
		this.playButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/4, 'play').setInteractive();
		this.fullscreenButton = this.add.image(this.sys.game.canvas.width/9.9, this.sys.game.canvas.height/1.2, 'fullscreen').setInteractive();
		this.optionsButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'options').setInteractive();
		this.creditsButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/(4/3), 'credits').setInteractive();
		this.soundButton = this.add.image(this.sys.game.canvas.width/1.1, this.sys.game.canvas.height/1.2, 'sound').setInteractive();
		this.soundButton2= this.add.image(this.sys.game.canvas.width/1.1, this.sys.game.canvas.height/1.2, 'sound2').setInteractive();
		this.soundButton2.setActive(false);
		this.soundButton2.setVisible(false);
		// Escuchamos los eventos del raton cuando interactual con nuestro sprite de "Start"
		this.fullscreenButton.on('pointerup', function () {
			this.fullscreenButton.setVisible(false)
			this.fullscreenButton2 = this.add.image(this.sys.game.canvas.width/9.9, this.sys.game.canvas.height/1.2, 'fullscreen2')
			this.time.addEvent({delay: 100, callback: function(){
				this.fullscreenButton2.setVisible(false);
				this.fullscreenButton.setVisible(true);
				this.time.addEvent({delay: 400, callback: function(){
					if (this.scale.isFullscreen){
						this.scale.stopFullscreen();
					}
					else{
						this.game.scale['autoCenter'] = Phaser.Scale.CENTER_BOTH;
						this.game.scale.displaySize['maxWidth'] = 8000;
						this.game.scale.displaySize['maxHeight'] = 8000;
						this.scale.startFullscreen();
					}
				}, callbackScope: this});
			}, callbackScope: this});
		}, this);

		this.scale.on('leavefullscreen', function () {
			this.game.scale['autoCenter'] = Phaser.Scale.CENTER_HORIZONTALLY;
				this.game.scale.displaySize['maxWidth'] = 900;
				this.game.scale.displaySize['maxHeight'] = 750;
		}, this);


	    this.playButton.on('pointerup', () => {
			this.playButton.setVisible(false);
			this.playButton2 = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/4, 'play2')
			this.time.addEvent({delay: 100, callback: function(){
			this.playButton2.setVisible(false);
				this.playButton.setVisible(true);
				this.time.addEvent({delay: 400, callback: function(){
				this.soundTitle.stop();
				this.scene.start('animation'); 
				}, callbackScope: this});
			}, callbackScope: this});
	    });

		this.creditsButton.on('pointerup', () => {
			this.creditsButton.setVisible(false);
			this.creditsButton2 = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/(4/3), 'credits2')
			this.time.addEvent({delay: 100, callback: function(){
				this.creditsButton2.setVisible(false);
				this.creditsButton.setVisible(true);
				this.time.addEvent({delay: 400, callback: function(){
				this.scene.launch('credits')				
			}, callbackScope: this});
			}, callbackScope: this});
	    });

		this.soundButton.on('pointerup', () => {
			this.soundButton2.setVisible(true);
			this.soundButton.setVisible(false);
			this.soundButton.setActive(false);
			this.soundTitle.mute = true;
	    });
		this.soundButton2.on('pointerup', () => {
			this.soundButton2.setVisible(false);
			this.soundButton2.setActive(false);
			this.soundButton.setVisible(true);
			this.soundTitle.mute = false;
	    });

		this.optionsButton.on('pointerup', () => {
			this.optionsButton.setVisible(false);
			this.optionsButton2 = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'options2')
			this.time.addEvent({delay: 100, callback: function(){
				this.optionsButton2.setVisible(false);
				this.optionsButton.setVisible(true);
				this.time.addEvent({delay: 400, callback: function(){
				/*AQUI IRA LA FUNCIONALIDAD DE optioon*/
				}, callbackScope: this});
			}, callbackScope: this});
	    });
	}
}