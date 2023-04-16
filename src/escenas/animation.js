import Witch from '../objetos/witch.js';
import Wolf from '../objetos/wolf.js';
import ExpBall from '../objetos/expBall.js';
import FireFlower from '../objetos/fireFlower.js';

/**
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	constructor() {
		super({ key: 'animation' });
	}

	preload() {
		this.load.spritesheet('witch', 'assets/Bruja/bruja.png', { frameWidth: 66, frameHeight: 66 })
		this.load.spritesheet('witchAttack', 'assets/Bruja/witchAttack.png', { frameWidth: 128, frameHeight: 128 })
		this.load.spritesheet('expBall', 'assets/Bruja/expBall.png', { frameWidth: 19, frameHeight: 18 })
		this.load.spritesheet('wolf', 'assets/enemies/wolfWalk.png', { frameWidth: 64.8, frameHeight: 33 })
		this.load.spritesheet('fireFlower', 'assets/GUI/fireFlower.png', { frameWidth: 479, frameHeight: 576 })
		this.load.tilemapTiledJSON('tilemap', 'levels/MapaPrueba.json'); //AQUI
		this.load.image('patronGround', 'levels/ground.png'); //AQUI
		this.load.image('patronTrees', 'levels/trees.png'); //AQUI
		this.load.image('patronHouse', 'levels/witchHouse.png'); //AQUI
		this.load.image('patronCliff', 'levels/cliff.png'); //AQUI
		this.load.image('patronRocks', 'levels/rocks.png'); //AQUI
		this.load.image('patronGraves', 'levels/graves.png'); //AQUI
		this.load.image('patronDecoration', 'levels/decoration.png'); //AQUI
		this.load.image('patronWater', 'levels/water.png'); //AQUI
		this.load.image('patronStair', 'levels/stair.png'); //AQUI

		this.load.image('pause_button', 'assets/GUI/pause_button.png')
		this.load.image('noname', 'assets/noname/noName1.png');
		this.load.image('noname2', 'assets/noname/noName2.png');

		this.load.css('css', 'css/mainsheet.css')
	}
	create() {
		this.map = this.make.tilemap({
			key: 'tilemap',
			tileWidth: 16,
			tileHeight: 16,
			width: 64,
			height: 32
		});
		const tileset1 = this.map.addTilesetImage('ground', 'patronGround'); //AQUI
		const tileset2 = this.map.addTilesetImage('trees', 'patronTrees'); //AQUI
		const tileset3 = this.map.addTilesetImage('witchHouse', 'patronHouse'); //AQUI
		const tileset4 = this.map.addTilesetImage('cliff', 'patronCliff'); //AQUI
		const tileset5 = this.map.addTilesetImage('rocks', 'patronRocks'); //AQUI
		const tileset6 = this.map.addTilesetImage('graves', 'patronGraves'); //AQUI
		const tileset7 = this.map.addTilesetImage('decoration', 'patronDecoration'); //AQUI
		const tileset8 = this.map.addTilesetImage('water', 'patronWater'); //AQUI
		const tileset9 = this.map.addTilesetImage('stair', 'patronStair'); //AQUI

		this.suelo = this.map.createLayer('Suelo',  [ tileset1,tileset2,tileset4,tileset5,tileset6,tileset7, tileset8, tileset9 ]);
		this.colisiones = this.map.createLayer('Colliders', [ tileset1,tileset2,tileset3,tileset4,tileset5,tileset6,tileset7, tileset8, tileset9 ]).setCollisionByExclusion(-1);
		this.arboles = this.map.createLayer('Arboles', [ tileset2,tileset5,tileset7]);
		this.arboles2 = this.map.createLayer('Arboles 2', [ tileset2,tileset5,tileset7]);
		this.arboles3 = this.map.createLayer('Arboles 3', [ tileset2,tileset5,tileset7]);

		this.spawnDistance = 280;
		this.nnprob = 0.05;
		this.wolfSize = 10;

		new FireFlower(this,0,0);
		this.witch = new Witch(this, 532, 3195);		
		this.physics.add.collider(this.witch, this.colisiones);
		this.muchosLobos = this.add.group();
		for (var i = 0; i < this.wolfSize; i++) {
			let wolf = new Wolf(this, Math.random() * 10, Math.random() * 10);
			this.muchosLobos.add(wolf);
		}
		
		this.physics.add.collider(this.witch, this.colisiones);
		this.physics.add.collider(this.witch, this.muchosLobos, this.witch.perderVida, null, this.witch)
		this.physics.add.collider(this.muchosLobos, this.colisiones);
		this.physics.add.collider(this.muchosLobos,this.muchosLobos);
		
		if(Math.random() < this.nnprob) {
			this.noname1 = this.add.image(20, 20, 'noname').setScale(0.5);
			this.noname2= this.add.image(120, 20, 'noname2').setScale(0.5);
		}

		// TEXTO DE NIVEL
		this.levelText = this.add.text(160, 115, 'Level: ',{fontFamily: 'titulo'})
		this.levelText.setResolution(100).setStroke(0x000000,2).setScrollFactor(0);

		// BARRA DE EXP
		this.expbar = this.add.rectangle(320,80,350,10,0x0000ff).setScrollFactor(0).setDepth(1);

		// BARRA DE VIDA
		this.lifebar = this.add.rectangle(320,100,350,20,0xff0000).setScrollFactor(0).setDepth(2);
		this.lifebarS = this.add.rectangle(328,100,366,20,0x000000).setScrollFactor(0).setDepth(1);
			
		this.healthText = this.add.text(300, 90, this.witch.health + '/' + this.witch.maxHealth,{fontFamily: 'titulo'});
		this.healthText.setResolution(100).setStroke(0x000000,2).setScrollFactor(0).setDepth(3);
		

		// BOTON DE PAUSA
		var button = this.add.image(500,280,'pause_button').setInteractive().setScrollFactor(0).setScale(0.05).setDepth(1);
		button.on('pointerup', poainter => {
			this.scene.pause();
			this.scene.launch('pause', {witch: this.witch})
		})
		
		// CAMARA 
		this.cameras.main.roundPixels = true;
		this.cameras.main.zoom = 1.75;
		this.cameras.main.startFollow(this.witch);

		this.events.on('resume', ( sys, skill) =>{
			if (skill) this.witch[skill.skillSelected]()
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
		this.scene.launch('levelUp', {witch: this.witch});
	}

	update(time,delta){
		if(this.witch.health <= 0){
			this.scene.pause();
			this.scene.launch('gameover');
		}
	}
	
}
