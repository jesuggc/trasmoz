import Witch from '../objetos/witch.js';
import Torquemada from '../objetos/torquemada.js';
import Skeleton from '../objetos/skeleton.js';
export default class Castle extends Phaser.Scene {
	constructor() {
		super({ key: 'castle' });
	}

	init (data) {
		this.oldWitch = data.witch
	}
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
          
        this.soundCastle = this.sound.add("castleSoundtrack", config);
		this.soundCastle.play()

		this.map = this.make.tilemap({
			key: 'castleTilemap',
			tileWidth: 16,
			tileHeight: 16,
			width: 64,
			height: 32
		});
		const tileset = this.map.addTilesetImage('castillo', 'patronCastle');
        
		this.suelo = this.map.createLayer('Suelo',  [ tileset]);
		this.colisiones = this.map.createLayer('Colisiones', [tileset]).setCollisionByExclusion(-1);
		this.puertas = this.map.createLayer('Puertas', [tileset]).setVisible(false).setCollisionByExclusion(-1).setDepth(2);
		this.decorado = this.map.createLayer('Decorado', [tileset]);
		this.spawnLayer = this.map.createLayer('Spawn', [tileset]);
        this.spawnPositions = this.initSpawn()

		
		this.eventoActivado = false;
		this.spawn = false;
        
		this.spawnDistance = 280;
		this.enemySize = 5;
        
		this.initWitch(this.oldWitch);
		this.physics.add.collider(this.witch, this.colisiones);
		this.enemyPool = this.add.group();
		for (var i = 0; i < this.enemySize; i++) {
		 	let skeleton = new Skeleton(this, Math.random() * 10, Math.random() * 10);
			this.enemyPool.add(skeleton);
		}

		 this.physics.add.collider(this.enemyPool, this.colisiones);
		 this.physics.add.collider(this.enemyPool,this.enemyPool);

		// CASTLE DOOR
		this.prueba = this.add.rectangle( 660, 780,750,30,0x000000).setVisible(false);
		this.physics.add.existing(this.prueba)
		this.physics.add.overlap(this.witch, this.prueba, () => {
			if(!this.eventoActivado){
				this.puertas.setVisible(true);
				this.physics.add.collider(this.witch, this.puertas);
				this.physics.add.collider(this.enemyPool, this.puertas);
				this.torquemada = new Torquemada(this,580,540,this.spawnPositions)
				this.enemyPool.add(this.torquemada);
				this.eventoActivado = true;
				this.spawn = true;
			}
		},null,this);
		this.physics.add.collider(this.enemyPool, this.witch, function(enemy, witch) { enemy.attack(); }, null, this);


		// TEXTO DE NIVEL
		this.levelText = this.add.text(160, 115, 'Level: ',{fontFamily: 'titulo'}).setResolution(100).setStroke(0x000000,2).setScrollFactor(0).setDepth(3);

		// BARRA DE EXP
		this.expbar = this.add.rectangle(320,80,350,10,0x0000ff).setScrollFactor(0).setDepth(1);

		// BARRA DE VIDA
		this.lifebar = this.add.rectangle(320,100,350,15,0xff0000).setScrollFactor(0).setDepth(3);
		this.lifebarS = this.add.rectangle(328,100,366,15,0x000000).setScrollFactor(0).setDepth(2);

		// BOTON DE PAUSA
		var button = this.add.image(500,280,'pause_button').setInteractive().setScrollFactor(0).setScale(0.4).setDepth(1);
		button.on('pointerup', poainter => {
			this.scene.pause();
			this.scene.launch('pause', {witch: this.witch, backScene: 'castle', music : this.soundCastle})
		})
		
		// CAMARA 
		this.cameras.main.roundPixels = true;
		this.cameras.main.zoom = 1.75;
		this.cameras.main.startFollow(this.witch);

		this.events.on('resume', ( sys, skill) =>{
			if (skill) this.witch[skill.skillSelected]()
		})
	}
	
	update(time,delta){
		if(this.witch.health <= 0){
            this.scene.stop();
			this.soundCastle.stop()
			this.scene.launch('gameover');
		}
		else if(this.torquemada && this.torquemada.health <= 0){
			this.scene.restart()
			this.scene.stop()
			this.soundCastle.stop()
			this.scene.launch('win')
		}
	}

	spawnEnemies(){
		for (var i = 0; i <= this.enemySize; i++) {
			const indiceAleatorio = Math.floor(Math.random() * this.spawnPositions.length);
			const coordenadaAleatoria = this.spawnPositions[indiceAleatorio];
			const enemy = this.enemyPool.getFirstDead();
			if (enemy) enemy.respawn(coordenadaAleatoria.x,coordenadaAleatoria.y);
	    }
	}
	
	initWitch(oldWitch){
		this.witch=new Witch(this,516,1416)
		this.witch.level = oldWitch.level;
		this.witch.abilityLevels = oldWitch.abilityLevels;
		this.witch.health = oldWitch.health;
		this.witch.experience = oldWitch.experience;
		this.witch.speed = oldWitch.speed;
		this.witch.maxHealth = oldWitch.maxHealth;
		this.witch.damage = oldWitch.damage;
		this.witch.shield = oldWitch.shield;
		this.witch.healthRegen = oldWitch.healthRegen;
		this.witch.rate = oldWitch.rate;
		this.witch.flowerArray = oldWitch.flowerArray;
		this.witch.level = oldWitch.level;
		this.witch.level = oldWitch.level;
		
		if(this.witch.flowerArray[0]===true) this.witch.createFire();
			// this.fireAttack = new FireAttack(this.scene, this, this.x, this.y);
			// this.fireAttack.collider.active = false;
			// this.fireAttack.stop('fireAttack', 26);
			// this.fireAttack.setVisible(false);
	}

	initSpawn(){
		let tiles = [];
		this.spawnLayer.forEachTile(function (tile) { if (tile.index !== -1) { tiles.push({ x: tile.pixelX, y: tile.pixelY }); } });
		return tiles;
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
		this.witch.body.setVelocity(0);
		this.scene.pause();
		this.scene.launch('levelUp', {witch: this.witch, backScene: 'castle'});
	}
	getRandomAlive() {
		const aliveMembers = this.enemyPool.getChildren().filter((child) => child.active && child.visible);
		if (aliveMembers.length === 0) {
		  return null; // No alive members in the group
		}
		const randomIndex = Phaser.Math.Between(0, aliveMembers.length - 1);
		return aliveMembers[randomIndex];
	}
}
