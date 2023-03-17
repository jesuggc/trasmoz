import Witch from '../objetos/witch.js';
import Wolf from '../objetos/wolf.js';
/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	constructor() {
		super({ key: 'animation' });
	}

	preload() {
		this.load.spritesheet('witch', 'assets/Bruja/bruja_run.png', { frameWidth: 64, frameHeight: 64 })
		this.load.tilemapTiledJSON('tilemap', 'levels/Mapa_inicial.json')
		this.load.image('patronesTilemap', 'levels/tiles.png');
		this.load.spritesheet('wolf', 'assets/enemies/wolf.png', { frameWidth: 64, frameHeight: 64 })
	}

	/* Creacion de los elementos de la escena principal de juego */
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
		this.witch = new Witch(this, 300, 300);
		//fullscreen
		this.fullscreenButton = this.add.image(0, 0, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
		this.fullscreenButton.setScale(0.05);
		this.fullscreenButton.setScrollFactor(0, 0);

		this.witch.body.onCollide = true; // Activamos onCollide para poder detectar la colision del caballero con el suelo
		this.physics.add.collider(this.witch, this.colisiones);

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la funcion anidada que viene a continuacion

		var muchosLobos = this.add.group();
		for (var i = 0; i < 1; i++) {
			//muchosLobos.create(this.witch.x + Math.random()*200, this.witch.y + Math.random()*200, 'wolf');
			let wolf = new Wolf(this, Math.random() * 10, Math.random() * 10);
			wolf.body.onCollide = true;
			this.physics.add.collider(wolf, this.colisiones);
			this.physics.add.collider(this.witch, wolf, this.perderVida, null, this);
		}



		this.fullscreenButton.on('pointerup', function () {

			if (this.scale.isFullscreen) {
				this.fullscreenButton.setFrame(0);
				this.scale.stopFullscreen();
			}
			else {
				this.fullscreenButton.setFrame(1);
				this.scale.startFullscreen();
			}

		}, this);
		
		this.lifebar = this.add.rectangle(320,100,350,20,0xff0000);
		this.lifebar.setScrollFactor(0);
		
		//Esta clase hay que organizarla esta mas feo que un coche por debajo
		this.cameras.main.roundPixels = true;
		this.cameras.main.zoom = 1.75;
		this.cameras.main.startFollow(this.witch)
	}
	perderVida(){
		this.witch.health-=0.1;
	}

}
