import Knight from '../objetos/knight.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'animation' });
	}
	
	preload(){
		this.load.image('castle', './assets/castle.gif');
		this.load.spritesheet('knight', './assets/Knight/knight.png', {frameWidth: 72, frameHeight: 86})
		this.load.tilemapTiledJSON('tilemap','./Levels/Mapa_inicial.json')
		this.load.image('patronesTilemap', './Levels/tiles.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 16, 
			tileHeight: 16,
			width: 60,
			height: 40 
		  });
		  const tileset1 = this.map.addTilesetImage('Tiles_faune_files', 'patronesTilemap');
		  this.suelo = this.map.createLayer('Suelo', tileset1);
		  this.colisiones = this.map.createLayer('Colliders', tileset1);
		  this.colisiones.setCollisionByExclusion(-1);
		  
		  //Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		  let knight = new Knight(this, 50, 0);
		  //fullscreen
		  this.fullscreenButton = this.add.image(0, 0, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
		  this.fullscreenButton.setScale(0.05);
		  this.fullscreenButton.setScrollFactor(0,0);
		  
		  knight.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo
		  this.physics.add.collider(knight, this.colisiones);
		  
		  let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación


		/*
		 * Escuchamos los eventos de colisión en el mundo para poder actuar ante ellos
		 * En este caso queremos detectar cuando el caballero colisiona con el suelo para activar el salto del personaje
		 * El salto del caballero lo desactivamos en su "clase" (archivo knight.js) para evitar dobles saltos
		 * También comprobamos si está en contacto con alguna caja mientras ataca, en ese caso destruimos la caja
		 */

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

		//this.cameras.main.zoom = 1.75;
		this.cameras.main.startFollow(knight)
	}
 
}
