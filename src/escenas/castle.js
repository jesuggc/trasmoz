import Witch from '../objetos/witch.js';
import Wolf from '../objetos/wolf.js';
import ExpBall from '../objetos/expBall.js';
import FireFlower from '../objetos/fireFlower.js';
import Knight from '../objetos/knight.js';
import Enemy from '../objetos/enemy.js';
/**
 * @extends Phaser.Scene
 */
export default class Castle extends Phaser.Scene {
	constructor() {
		super({ key: 'castle' });
	}

	preload() {
		this.load.spritesheet('witch', 'assets/Bruja/bruja.png', { frameWidth: 66, frameHeight: 66 })
		this.load.spritesheet('witchAttack', 'assets/Bruja/FireBall.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('expBall', 'assets/Bruja/expBall.png', { frameWidth: 19, frameHeight: 18 })
		this.load.spritesheet('wolf', 'assets/enemies/wolfWalk.png', { frameWidth: 64.8, frameHeight: 33 })
		this.load.spritesheet('fireFlower', 'assets/GUI/fireFlower.png', { frameWidth: 479, frameHeight: 576 })
		this.load.tilemapTiledJSON('castleTilemap', 'levels/castillo.json'); 
		this.load.image('patronCastle', 'levels/Castle.png'); 


		
		this.load.spritesheet('knight', 'assets/enemies/knight/knightWalk.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('knightAttack', 'assets/enemies/knight/knightAttack.png', { frameWidth: 74, frameHeight: 73 })
		
		this.load.image('pause_button', 'assets/GUI/pause_button.png')
		this.load.image('noname', 'assets/noname/noName1.png');
		this.load.image('noname2', 'assets/noname/noName2.png');

		this.load.css('css', 'css/mainsheet.css')
	}

	init (data) {
		this.witch = data.witch;
		this.witch.scene = this;
		this.witch.createAnims();
		console.log("🚀 ~ file: castle.js:38 ~ Castle ~ init ~ data.witch:", data.witch)
		
	}
	create() {
		this.map = this.make.tilemap({
			key: 'castleTilemap',
			tileWidth: 16,
			tileHeight: 16,
			width: 64,
			height: 32
		});
		const tileset = this.map.addTilesetImage('castillo', 'patronCastle'); //AQUI
        
		this.suelo = this.map.createLayer('Suelo',  [ tileset]);
		this.colisiones = this.map.createLayer('Colisiones', [tileset]).setCollisionByExclusion(-1);
		this.puertas = this.map.createLayer('Puertas', [tileset]).setVisible(false)
		this.decorado = this.map.createLayer('Decorado', [tileset]);
        this.evento = this.map.createLayer('Evento', [tileset]).setVisible(false);
        this.eventoActivado = false;
        
		this.spawnDistance = 280;
		this.nnprob = 0.05;
		this.wolfSize = 2;
        
		
		this.witch.x = 516;
		this.witch.y = 1416;	
		this.physics.add.collider(this.witch, this.colisiones);
		this.enemyPool = this.add.group();
		for (var i = 0; i < this.wolfSize; i++) {
			let wolf = new Wolf(this, Math.random() * 10, Math.random() * 10);
			this.enemyPool.add(wolf);
			let knight = new Knight(this, Math.random() * 10, Math.random() * 10);
			this.enemyPool.add(knight);
		}

		this.physics.add.collider(this.enemyPool, this.witch, function(enemy, witch) {
			enemy.attack();
			}, null, this);

		this.physics.add.collider(this.enemyPool, this.colisiones);
		this.physics.add.collider(this.enemyPool,this.enemyPool);
        this.physics.add.overlap(this.witch,this.evento,(player, capa)=> {
            if(capa.index !== -1 && !this.eventoActivado)
            this.puertas.setVisible(true);
            this.physics.add.collider(this.witch, this.puertas);
            this.physics.add.collider(this.enemyPool, this.puertas);
        })

		
		if(Math.random() < this.nnprob) {
			this.noname1 = this.add.image(20, 20, 'noname').setScale(0.5);
			this.noname2= this.add.image(120, 20, 'noname2').setScale(0.5);
		}

		// TEXTO DE NIVEL
		this.levelText = this.add.text(160, 115, 'Level: ',{fontFamily: 'titulo'})
		this.levelText.setResolution(100).setStroke(0x000000,2).setScrollFactor(0).setDepth(3);

		// BARRA DE EXP
		this.expbar = this.add.rectangle(320,80,350,10,0x0000ff).setScrollFactor(0).setDepth(1);

		// BARRA DE VIDA
		this.lifebar = this.add.rectangle(320,100,350,15,0xff0000).setScrollFactor(0).setDepth(3);
		this.lifebarS = this.add.rectangle(328,100,366,15,0x000000).setScrollFactor(0).setDepth(2);

		// BOTON DE PAUSA
		var button = this.add.image(500,280,'pause_button').setInteractive().setScrollFactor(0).setScale(0.05).setDepth(1);
		button.on('pointerup', poainter => {
			this.scene.pause();
			this.scene.launch('pause', {witch: this.witch, backScene: 'castle'})
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
		this.scene.launch('levelUp', {witch: this.witch, backScene: 'castle'});
	}

	update(time,delta){
		if(this.witch.health <= 0){
            this.scene.stop();
			this.scene.launch('gameover');
		}
	}
	
}