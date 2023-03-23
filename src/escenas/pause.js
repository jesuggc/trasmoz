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
            this.playButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/4, 'play').setInteractive();
            this.fullscreenButton = this.add.image(this.sys.game.canvas.width/9.9, this.sys.game.canvas.height/1.2, 'fullscreen').setInteractive();
            this.optionsButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'options').setInteractive();
            this.optionsButton2 = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'options2').setInteractive();
            this.creditsButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/(4/3), 'credits').setInteractive();
            this.soundButton = this.add.image(this.sys.game.canvas.width/1.1, this.sys.game.canvas.height/1.2, 'sound').setInteractive();
            // Escuchamos los eventos del raton cuando interactual con nuestro sprite de "Start"
            this.fullscreenButton.on('pointerup', function () {
                console.log("Entro fullscreen")
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
    
    
            this.playButton.on('pointerup', () => {
                this.playButton.destroy()
                this.playButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/4, 'play2')
                this.time.addEvent({delay: 100, callback: function(){
                this.playButton.destroy();
                    this.playButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/4, 'play').setInteractive();
                    this.time.addEvent({delay: 400, callback: function(){
                    this.scene.resume('animation');
                    this.scene.stop()
                    }, callbackScope: this});
                }, callbackScope: this});
            });
          })
		


	}
}