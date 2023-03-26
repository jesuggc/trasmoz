import Witch from '../objetos/witch.js';
import Wolf from '../objetos/wolf.js';
import ExpBall from '../objetos/expBall.js'
/**
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	constructor() {
		super({ key: 'animation' });
	}

	preload() {
		this.load.spritesheet('witch', 'assets/Bruja/bruja_run.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('witchAttack', 'assets/Bruja/witchAttack.png', { frameWidth: 128, frameHeight: 128 })
		this.load.spritesheet('expBall', 'assets/Bruja/expBall.png', { frameWidth: 19, frameHeight: 18 })
		this.load.spritesheet('wolf', 'assets/enemies/wolf.png', { frameWidth: 64, frameHeight: 64 })
		this.load.tilemapTiledJSON('tilemap', 'levels/Mapa_inicial.json');
		this.load.image('patronesTilemap', 'levels/tiles.png');
		this.load.image('pause_button', 'assets/GUI/pause_button.png')
		this.load.image('noname', 'assets/noname/noName1-removebg-preview.png');
		this.load.image('noname2', 'assets/noname/noName2-removebg-preview.png');
		//this.load.image('lifebar', 'assets/GUI/lifebar.png');
		//this.load.image('lifebarFill', 'assets/GUI/lifebarFill.png');
		this.load.css('css', 'css/mainsheet.css')
	}
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
		this.noname1;
		this.noname2;
		this.spawnDistance = 280;
	
		this.witch = new Witch(this, 300, 300);		
		this.physics.add.collider(this.witch, this.colisiones);
		this.muchosLobos = this.add.group();
		for (var i = 0; i < 10; i++) {
			let wolf = new Wolf(this, Math.random() * 10, Math.random() * 10);
			this.muchosLobos.add(wolf);
		}
		this.physics.add.collider(this.witch, this.muchosLobos, this.witch.perderVida, null, this.witch)
		this.physics.add.collider(this.muchosLobos, this.colisiones);
		this.physics.add.collider(this.witch, this.muchosLobos, this.perderVida, null, this);
		this.physics.add.collider(this.muchosLobos,this.muchosLobos);
		
		if(Math.random() < 0.95) {
			this.noname1 = this.add.image(20, 20, 'noname');
			this.noname2= this.add.image(120, 20, 'noname2');
			this.noname1.setScale(0.5);
			this.noname2.setScale(0.5);
		}

		// FULLSCREEN
		this.fullscreenButton = this.add.image(0, 0, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
		this.fullscreenButton.setScale(0.05);
		this.fullscreenButton.setScrollFactor(0);
		
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

		// TEXTO DE NIVEL
		this.levelText = this.add.text(160, 115, 'Level: ',{fontFamily: 'titulo'});
		this.levelText.setResolution(100);
		this.levelText.setStroke(0x000000,2);
		this.levelText.setScrollFactor(0);

		// BARRA DE EXP
		this.expbar = this.add.rectangle(320,80,350,10,0x0000ff);
		this.expbar.setScrollFactor(0);
		this.expbar.setDepth(1);

		// BARRA DE VIDA
		this.lifebar = this.add.rectangle(320,100,350,20,0xff0000);
		this.lifebar.setScrollFactor(0);
		this.lifebar.setDepth(2);
		this.healthText = this.add.text(300, 90, this.witch.health + '/' + this.witch.maxHealth,{fontFamily: 'titulo'});
		this.healthText.setResolution(100);
		this.healthText.setStroke(0x000000,2);
		this.healthText.setScrollFactor(0);
		this.healthText.setDepth(3);
		this.lifebarS = this.add.rectangle(320,100,350,20,0x000000);
		this.lifebarS.setScrollFactor(0);
		this.lifebarS.width = 366;
		this.lifebarS.setDepth(1);
		//this.lifebar = this.add.image(this.sys.game.canvas.width/3.5, this.sys.game.canvas.height/1.35, 'lifebar').setScrollFactor(0)
		//this.lifebarFill = this.add.image(this.sys.game.canvas.width/3.5, this.sys.game.canvas.height/1.35, 'lifebarFill').setScrollFactor(0)

		// BOTON DE PAUSA
		var button = this.add.image(500,280,'pause_button').setInteractive();
		button.setScrollFactor(0);
		button.setScale(0.05);
		button.setDepth(1);
		button.on('pointerup', pointer => {
			this.scene.pause();
			this.scene.launch('pause')
		})
		
		// CAMARA 
		this.cameras.main.roundPixels = true;
		this.cameras.main.zoom = 1.75;
		this.cameras.main.startFollow(this.witch);

		this.events.on('resume', ( sys, skill) =>{
			if (skill)this.witch[skill.skillSelected]()
		})
		
	}
	generateRandomY(){
		let k = this.witch.y;
		let leftL = k - this.spawnDistance;
		let rightL = k + this.spawnDistance;
		return Math.random()*(rightL - leftL) + leftL;
	}
	generateRandomX(y){
		let h = this.witch.x;
		let k = this.witch.y;
		let b = -2 * this.witch.x;
		let c = Math.pow(h,2) + Math.pow(y,2) + Math.pow(k,2) - Math.pow(this.spawnDistance,2) - 2 * y * k;
		let x = (-b+ Math.sqrt(Math.pow(b,2)-4*c))/2;	
		let x1 = (-b- (Math.sqrt(Math.pow(b,2)-4*c)))/2;
		if (Math.random()>0.5) return x;
		else return x1;
	}

	levelUp(){
		this.witch.body.setVelocity(0);
		this.scene.pause();
		this.scene.launch('levelUp');
	}

	update(time,delta){
		if(this.witch.health <= 0){
			this.scene.pause();
			this.scene.launch('gameover');
		}
	}
	
}
