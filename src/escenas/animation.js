import Witch from '../objetos/witch.js';
import Wolf from '../objetos/wolf.js';
import FireFlower from '../objetos/fireFlower.js';
import Knight from '../objetos/knight.js';
import LightningFlower from '../objetos/lightningFlower.js';
import IceFlower from '../objetos/iceFlower.js';
import PoisonFlower from '../objetos/poisonFlower.js';

export default class Animation extends Phaser.Scene {
	constructor() {
		super({ key: 'animation' });
	}

	preload() {
		this.load.tilemapTiledJSON('tilemap',	'levels/MapaPrueba.json'); 
		this.load.spritesheet('witch', 			'assets/witch/bruja.png', 					{ frameWidth: 66, frameHeight: 66 })
		this.load.spritesheet('witchAttack', 	'assets/witch/FireBall.png', 				{ frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('wolf', 			'assets/enemies/wolf/wolfWalk.png', 		{ frameWidth: 64.8, frameHeight: 33 })
		this.load.spritesheet('knight', 		'assets/enemies/knight/knightWalk.png', 	{ frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('knightAttack', 	'assets/enemies/knight/knightAttack.png',	{ frameWidth: 74, frameHeight: 73 })
		this.load.spritesheet('fireAttack', 	'assets/witch/fireAttack.png',				{frameWidth: 96, frameHeight: 96})
		this.load.spritesheet('lightningAttack','assets/witch/lightningAttack.png', 		{frameWidth: 64, frameHeight: 64})
		this.load.spritesheet('freezeAttack', 	'assets/witch/freezeAttack.png', 			{frameWidth: 128, frameHeight: 128 })
		this.load.spritesheet('poisonAttack', 	'assets/witch/poisonAttack.png', 			{frameWidth: 64, frameHeight: 64 })
		this.load.image('patronGround', 	'levels/ground.png'); 
		this.load.image('patronTrees', 		'levels/trees.png'); 
		this.load.image('patronHouse', 		'levels/witchHouse.png');
		this.load.image('patronCliff',		'levels/cliff.png');
		this.load.image('patronRocks',		'levels/rocks.png'); 
		this.load.image('patronGraves', 	'levels/graves.png');
		this.load.image('patronDecoration',	'levels/decoration.png'); 
		this.load.image('patronWater', 		'levels/water.png'); 
		this.load.image('patronSquare', 	'levels/square.png'); 
		this.load.image('patronBridge', 	'levels/bridge.png'); 
		this.load.image('fireFlower', 		'assets/flowers/fireFlower.png')
		this.load.image('lightningFlower', 	'assets/flowers/lightningFlower.png')
		this.load.image('iceFlower', 		'assets/flowers/iceFlower.png')
		this.load.image('poisonFlower', 	'assets/flowers/poisonFlower.png')
		this.load.image('expBall',			'assets/witch/expBall.png')
		this.load.image('pause_button', 	'assets/GUI/pause_button.png')
		this.load.image('noname', 			'assets/noname/noName1.png');
		this.load.image('noname2', 			'assets/noname/noName2.png');
	}
	create() {
		this.map = this.make.tilemap({
			key: 'tilemap',
			tileWidth: 16,
			tileHeight: 16,
			width: 64,
			height: 32
		});
		const ts1 = this.map.addTilesetImage('ground', 		'patronGround');
		const ts2 = this.map.addTilesetImage('trees', 		'patronTrees'); 
		const ts3 = this.map.addTilesetImage('witchHouse', 	'patronHouse'); 
		const ts4 = this.map.addTilesetImage('cliff', 		'patronCliff'); 
		const ts5 = this.map.addTilesetImage('rocks', 		'patronRocks'); 
		const ts6 = this.map.addTilesetImage('graves', 		'patronGraves'); 
		const ts7 = this.map.addTilesetImage('decoration', 	'patronDecoration');
		const ts8 = this.map.addTilesetImage('water', 		'patronWater'); 
		const ts9 = this.map.addTilesetImage('square', 		'patronSquare'); 
		const ts10 = this.map.addTilesetImage('bridge', 	'patronBridge');

		this.suelo = this.map.createLayer('Suelo',  		[ ts1,ts4, ts8, ts9, ts10]);
		this.suelo2 = this.map.createLayer('Suelo2',  		[ ts1,ts2,ts3,ts4,ts5,ts6,ts7, ts8, ts9, ts10 ]);
		this.colisiones = this.map.createLayer('Colliders',	[ ts1,ts2,ts3,ts4,ts5,ts6,ts7, ts8, ts9, ts10 ]).setCollisionByExclusion(-1);
		this.arboles = this.map.createLayer('Arboles 1',	[ ts2,ts7, ts9, ts10]).setDepth(2);
		this.arboles2 = this.map.createLayer('Arboles 2', 	[ ts2,ts7, ts9,ts10]).setDepth(2);
		this.arboles3 = this.map.createLayer('Arboles 3', 	[ ts2,ts7, ts9,ts10]).setDepth(2);

		this.spawnDist = 280;
		this.nnprob = 0.05;
		this.poolSize = 50; 
		this.enemiesSize = 0; 
		this.initialEnemies = 9;
		this.enemiesJump = 3;
		this.spawn = false;
		
		this.witch = new Witch(this);		
		this.fireflower = new FireFlower(this,390,355,'fireFlower');
		this.lightningflower = new LightningFlower(this, 4549, 392), 'lightningFlower';
		this.iceflower = new IceFlower(this, 344, 1427, 'iceFlower');
		this.poisonflower = new PoisonFlower(this, 4280, 1843, 'poisonFlower');
		
		this.enemyPool = this.add.group();
		for (var i = 0; i < this.poolSize; i++) {
			this.enemyPool.add(new Wolf(this));
			this.enemyPool.add(new Knight(this));
		}
		this.updatePoolSize(this.initialEnemies);
		
		
		this.physics.add.collider(this.witch, this.colisiones);
		this.physics.add.collider(this.enemyPool, this.witch, function(enemy, witch) { enemy.attack(); }, null, this);
		this.physics.add.collider(this.enemyPool, this.colisiones);
		this.physics.add.collider(this.enemyPool,this.enemyPool);
		this.physics.add.collider(this.fireflower, this.witch, this.fireflower.recogerFlor, null, this.fireflower);
		this.physics.add.collider(this.lightningflower, this.witch, this.lightningflower.recogerFlor, null, this.lightningflower);
		this.physics.add.collider(this.iceflower, this.witch, this.iceflower.recogerFlor, null, this.iceflower);
		this.physics.add.collider(this.poisonflower, this.witch, this.poisonflower.recogerFlor, null, this.poisonflower);
	
		
		if(Math.random() < this.nnprob) {
			this.noname1 = this.add.image(300, 300, 'noname').setScale(0.5);
			this.noname2= this.add.image(300, 300, 'noname2').setScale(0.5);
		}

		// TEXTO DE NIVEL
		this.levelText = this.add.text(160, 115, 'Level: ',{fontFamily: 'titulo'})
		this.levelText.setResolution(100).setStroke(0x000000,2).setScrollFactor(0).setDepth(3);

		// BARRA DE EXP
		this.expbar = this.add.rectangle(320,80,350,10,0x0000ff).setScrollFactor(0).setDepth(2);

		// CASTLE DOOR
		this.prueba = this.add.rectangle( 1850, 750,20,30,0x000000).setDepth(1);
		this.physics.add.existing(this.prueba)
		this.physics.add.overlap(this.witch, this.prueba, this.gotoCastle,null,this)
		
		// BARRA DE VIDA
		this.lifebar = this.add.rectangle(320,100,350,15,0xff0000).setScrollFactor(0).setDepth(3);
		this.lifebarS = this.add.rectangle(328,100,366,15,0x000000).setScrollFactor(0).setDepth(2);

		// BOTON DE PAUSA
		var button = this.add.image(500,280,'pause_button').setInteractive().setScrollFactor(0).setScale(0.05).setDepth(3);
		button.on('pointerup', () => { this.pauseScene() })
		
		// CAMARA 
		this.cameras.main.roundPixels = true;
		this.cameras.main.zoom = 1.75;
		this.cameras.main.startFollow(this.witch);

		this.events.on('resume', ( sys, skill) =>{
			if (skill) this.witch[skill.skillSelected]()
		})	
	}
	update(time,delta){
		if(this.witch.health <= 0) this.gameOverScene();
		this.spawn = this.enemiesSize !== 0;
	}
	generateRandomY(){
		let leftL = this.witch.y - this.spawnDist;
		let rightL = this.witch.y + this.spawnDist;
		return Math.random()*(rightL - leftL) + leftL;
	}
	generateRandomX(y){
		let h = this.witch.x;
		let k = this.witch.y;
		let b = -2 * this.witch.x;
		let c = h**2 + y**2 + k**2 - this.spawnDist**2 - 2 * y * k;
		let x = (-b+ Math.sqrt(b**2-4*c))/2;	
		let x1 = (-b- (Math.sqrt(b**2-4*c)))/2;
		if (Math.random()>0.5) return x;
		else return x1;
	}

	levelUp(){
		this.levelUpScene();
		this.updatePoolSize(this.enemiesJump);
	}
	
	levelUpScene(){
		this.scene.pause();
		this.scene.launch('levelUp', {witch: this.witch, backScene: 'animation'});
	}
	
	gameOverScene(){
		this.scene.pause();
		this.scene.launch('gameover');
	}

	pauseScene(){
		this.scene.pause();
		this.scene.launch('pause', {witch: this.witch, backScene: 'animation'})
	}

	gotoCastle(){
		this.scene.stop();
		this.scene.launch('castle', {witch: this.witch});
	}

	updatePoolSize(nSize){
		this.enemiesSize+= nSize;
		for (let i = 0; i < nSize; i++){
			this.enemyPool.getFirstDead().respawn();
		}
	}

	levelUpEnemies(){
		this.enemyPool.children.entries.forEach(enemigo=>enemigo.levelUp())
	}
	
}
