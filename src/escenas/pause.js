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
        this.load.image('continue', 'assets/GUI/resetButton1.png');
		this.load.image('continue2', 'assets/GUI/resetButton2.png');
        this.load.image('pause_background', 'assets/GUI/pause_background.jpg')
        this.load.image('witchPause', 'assets/Bruja/image.png')
        this.load.image('speed', 'assets/GUI/speed.png')
	}

	create() {
        this.windowW = this.sys.game.canvas.width;
        this.windowH = this.sys.game.canvas.height;
		var back = this.add.image(this.windowW/2, -400, 'pause_background');
        var r = 1.3; // Buttons alignment
        back.setScale(0.7);
        var tween = this.tweens.add({
            targets: back,
            y: 80,
            duration: /*15*/100,
            ease: 'Power2',
            yoyo: false,
            repeat: 0
          });
        tween.on('complete', () => {
            this.playButton = this.add.image(this.windowW/r, this.windowH/4, 'continue').setInteractive();
            this.optionsButton = this.add.image(this.windowW/r, this.windowH/2, 'options').setInteractive();
            this.fullscreenButton = this.add.image(this.windowW/1.45, this.windowH/1.2, 'fullscreen').setInteractive();
            this.soundButton = this.add.image(this.windowW/1.18, this.windowH/1.2, 'sound').setInteractive();
            this.witch = this.add.image(this.windowW/7, this.windowH/2, 'witchPause');
            this.witch.setScale(0.4)

            this.add.rectangle(280,180,180,40,"0xff0000").setScrollFactor(0).setDepth(2)

            // Escuchamos los eventos del raton cuando interactual con nuestro sprite de "Start"
            this.fullscreenButton.on('pointerup', function () {
                this.fullscreenButton.setVisible(false)
                this.fullscreenButton2 = this.add.image(this.windowW/1.45, this.windowH/1.2, 'fullscreen2')
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
                this.playButton2 = this.add.image(this.windowW/r, this.windowH/4, 'continue2')
                this.time.addEvent({delay: 100, callback: function(){
                this.playButton2.setVisible(false);
                    this.playButton.setVisible(true);
                    this.time.addEvent({delay: 400, callback: function(){
                        this.scene.resume('animation');
                        this.scene.stop()
                    }, callbackScope: this});
                }, callbackScope: this});
            });
    
            this.soundButton.on('pointerup', () => {
                this.soundButton.setVisible(false);
                this.soundButton2= this.add.image(this.windowW/1.18, this.windowH/1.2, 'sound2')
                this.time.addEvent({delay: 100, callback: function(){
                    this.soundButton2.setVisible(false);
                    this.soundButton.setVisible(true);
                    this.time.addEvent({delay: 400, callback: function(){
                    /*AQUI IRA LA FUNCIONALIDAD DE SONIDO*/
                    }, callbackScope: this});
                }, callbackScope: this});
            });
    
            this.optionsButton.on('pointerup', () => {
                this.optionsButton.setVisible(false);
                this.optionsButton2 = this.add.image(this.windowW/r, this.windowH/2, 'options2')
                this.time.addEvent({delay: 100, callback: function(){
                    this.optionsButton2.setVisible(false);
                    this.optionsButton.setVisible(true);
                    this.time.addEvent({delay: 400, callback: function(){
                    /*AQUI IRA LA FUNCIONALIDAD DE optioon*/
                    }, callbackScope: this});
                }, callbackScope: this});
            });
		}, this);

		

	}
}