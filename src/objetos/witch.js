export default class Witch extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Bruja, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'witch');

		this.healthRegen = 0.1;
		this.speed = 70; // Nuestra velocidad de movimiento sera 140
		this.diagonalSpeed = 49 //calculado por pitagoras
		this.health = 100;
		this.maxHealth = 100;
		this.experience = 0;
		this.levelExp = [10,15,25,40,65,105,170,275,445,720,1165, 1885,3050,4935,7985,12920,20905,33825,54730,88555,143285,231840,375125,606965,982090,1589055,2571145,4160200,6731345,10891545,17622890,28514435,46137325,74651760,120789085,195440845,316229930,511670775,827900705,1339571480,2167472185,3507043665,5674515850,9181559515,14856075365,24037634880,38893710245,62931345125,101825055370,164756400495,266581455865,43133785636010];
		this.level = 0;
		this.setScale(0.5);
		this.maxLevel = 15;

		this.scene.add.existing(this); //Anadimos el caballero a la escena

		// Creamos las animaciones de nuestro caballero
		this.scene.anims.create({
			key: 'idleWitch',
			frames: scene.anims.generateFrameNumbers('witch', {start:7, end:7}),
			frameRate: 12,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'runWitch',
			frames: scene.anims.generateFrameNumbers('witch', {start:0, end:7}),
			frameRate: 12,
			repeat: -1
		});
		
		// La animacion a ejecutar segun se genere el personaje sera 'idle'
		this.play('idleWitch');

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); 
		this.aKey = this.scene.input.keyboard.addKey('A'); 
		this.sKey = this.scene.input.keyboard.addKey('S'); 
		this.dKey = this.scene.input.keyboard.addKey('D');

		this.testingKey = this.scene.input.keyboard.addKey('P');
		
		// Agregamos la bruja a las fisicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);

		// Decimos que el caballero colisiona con los limites del mundo
		//this.body.setCollideWorldBounds();

		// Ajustamos el "collider" 
		this.bodyOffsetWidth = this.body.width/4;
		this.bodyOffsetHeight = this.body.height/6;
		this.bodyWidth = this.body.width/1.7;
		this.bodyHeight = this.body.height/1.055;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;
	}

	preUpdate(t, dt) {
		console.log("Hola soy bruja")
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutara la animacion
		super.preUpdate(t, dt);
		this.scene.expbar.width = 366* this.experience/this.levelExp[this.level];
		this.scene.lifebar.width = 366* this.health/this.maxHealth;

		if(this.health < this.maxHealth) this.health += this.healthRegen;
		// EXPERIENCIA
		if(this.experience >= this.levelExp[this.level] && this.level < this.maxLevel) {
			this.experience = 0;
			this.level++;
		}

		if (this.health <= 0) this.scene.lifebar.visible = false;
		if(this.testingKey.isDown){
			this.speed = 600;
			this.diagonalSpeed = 424;
			this.health -= 1;
			this.scene.drawCircle();
		}
		// MOVERSE A LA IZQUIERDA
		if(this.aKey.isDown){
			this.setFlipX(true)
			if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');
			
			if (this.wKey.isDown || this.sKey.isDown) this.body.setVelocityX(-this.diagonalSpeed);
			else this.body.setVelocityX(-this.speed);
		}

		// MOVERSE A LA DERECHA
		if(this.dKey.isDown){
			this.setFlipX(false);
			if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');

			if (this.wKey.isDown || this.sKey.isDown) this.body.setVelocityX(this.diagonalSpeed);
			else this.body.setVelocityX(this.speed);
		}
//probando
		// MOVERSE ARRIBA
		if(this.wKey.isDown){
			this.setFlipX(this.flipX)
			if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');
			
			if (this.aKey.isDown || this.dKey.isDown) this.body.setVelocityY(-this.diagonalSpeed);
			else this.body.setVelocityY(-this.speed);
		}

		// MOVERSE ABAJO
		if(this.sKey.isDown){
			this.setFlipX(this.flipX)
			if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');
			
			if (this.aKey.isDown || this.dKey.isDown) this.body.setVelocityY(this.diagonalSpeed);
			else this.body.setVelocityY(this.speed);
		}
		
		// Si dejamos de pulsar 'A' o 'D' volvemos al estado de animacion'idle'
		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey) || Phaser.Input.Keyboard.JustUp(this.wKey)|| Phaser.Input.Keyboard.JustUp(this.sKey)){
			if(this.anims.isPlaying === true) this.play('idleWitch');
			this.body.setVelocity(0);
		}

		this.scene.levelText.setText([
			'Level: ' + this.level 
		]);
	}
	winExperience(){
		if(this.level < this.maxLevel || this.experience < this.levelExp[this.level]) this.experience += 1;
	}
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

}