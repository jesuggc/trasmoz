import Witch from '../objetos/witch.js';
import Wolf from '../objetos/wolf.js';
import ExpBall from '../objetos/expBall.js'
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
		this.load.image('pause_button', 'assets/GUI/pause_button.png')
		this.load.spritesheet('witchAttack', 'assets/Bruja/witchAttack.png', { frameWidth: 128, frameHeight: 128 })
		this.load.spritesheet('expBall', 'assets/Bruja/expBall.png', { frameWidth: 19, frameHeight: 18 })
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
		
		this.r = 280; // Distancia de generacion de enemigos
		
		//Instanciamos nuestro personaje
		this.witch = new Witch(this, 300, 300);

		// LOBO SOLITARIO PARALITICO PARA DEBUG
		this.wolf = new Wolf(this,495,310);
		this.wolf.body.onCollide = true;
		//this.wolf.body.disableBody(true,true);
		this.physics.add.collider(this.wolf, this.colisiones);
		this.physics.add.collider(this.witch, this.wolf, this.perderVida, null, this);


		this.witch.body.onCollide = true; // Activamos onCollide para poder detectar la colision 
		this.physics.add.collider(this.witch, this.colisiones, this.witch.winExperience(), null, this);

		//this.camera.roundPixels = true;
		
		var muchosLobos = this.add.group();
		for (var i = 0; i < 0; i++) {
			//muchosLobos.create(this.witch.x + Math.random()*200, this.witch.y + Math.random()*200, 'wolf');
			let wolf = new Wolf(this, Math.random() * 10, Math.random() * 10);
			wolf.body.onCollide = true;
			this.physics.add.collider(wolf, this.colisiones);
			this.physics.add.collider(this.witch, wolf, this.perderVida, null, this);
		}
		
		// FULLSCREEN
		this.fullscreenButton = this.add.image(0, 0, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
		this.fullscreenButton.setScale(0.05);
		this.fullscreenButton.setScrollFactor(0, 0);
		
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

		// NIVEL
		this.levelText = this.add.text(160, 115, 'Level: ', { font: '"Press Start 2P"' });
		this.levelText.setScrollFactor(0);

		// BARRA DE EXP
		this.expbar = this.add.rectangle(320,80,350,10,0x0000ff);
		this.expbar.setScrollFactor(0);
		this.expbar.setDepth(1);

		// BARRA DE VIDA
		this.lifebar = this.add.rectangle(320,100,350,20,0xff0000);
		this.lifebar.setScrollFactor(0);
		this.lifebar.setDepth(2);
		this.lifebarS = this.add.rectangle(320,100,350,20,0x000000);
		this.lifebarS.setScrollFactor(0);
		this.lifebarS.width = 366;
		this.lifebarS.setDepth(1);

		// BOTON DE PAUSA
		var button = this.add.image(500,280,'pause_button').setInteractive();
		button.setScrollFactor(0,0);
		button.setScale(0.05);
		button.setDepth(1);
		button.on('pointerup', pointer => {
			this.scene.pause();
			this.scene.launch('pause')
			console.log("Pulso pausa")
		})
		new ExpBall(this, this.wolf.x, this.wolf.y)
		// CAMARA 
		this.cameras.main.roundPixels = true;
		this.cameras.main.zoom = 1.75;
		this.cameras.main.startFollow(this.witch);
		
	}
	generateRandomY(){
		let k = this.witch.y;
		let leftL = k - this.r;
		let rightL = k + this.r;
		return Math.random()*(rightL - leftL) + leftL;
	}
	generateRandomX(y){
		let h = this.witch.x;
		let k = this.witch.y;
		let b = -2 * this.witch.x;
		let c = Math.pow(h,2) + Math.pow(y,2) + Math.pow(k,2) - Math.pow(this.r,2) - 2 * y * k;
		let x = (-b+ Math.sqrt(Math.pow(b,2)-4*c))/2;	
		let x1 = (-b- (Math.sqrt(Math.pow(b,2)-4*c)))/2;
		if (Math.random()>0.5) return x;
		else return x1;
	}
	drawCircle(){
		let h = this.witch.x;
		let k = this.witch.y;
		let leftL = k - this.r;
		let rightL = k + this.r;
		let y = Math.random()*(rightL - leftL) + leftL;
		let b = -2 * h;
		let c = Math.pow(h,2) + Math.pow(y,2) + Math.pow(k,2) - Math.pow(this.r,2) - 2 * y * k;
		
		let x = (-b+ Math.sqrt(Math.pow(b,2)-4*c))/2;	
		let x1 = (-b- (Math.sqrt(Math.pow(b,2)-4*c)))/2;

		if (Math.random()>0.5) this.add.circle(x,y,2, 0xff0000);
		else this.add.circle(x1,y,2, 0xff0000);

	}
	
	perderVida(){
		this.witch.health-=0.1;
		this.witch.setTintFill(0xff0000);
		this.time.addEvent({delay: 150, callback: function(){
			this.witch.clearTint();
        }, callbackScope: this});
		this.witch.winExperience();
	}
 
}
