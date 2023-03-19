export default class Witch extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Bruja, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'witch');
		this.speed = 70; // Nuestra velocidad de movimiento sera 140
		this.diagonalSpeed = 49 //calculado por pitagoras
		this.health = 100;
		this.maxHealth = 100;
		this.experience = 0;
		this.maxExperience = 10;
		this.levelExp = [10,15,25,40,65,105,170];
		this.level = 0;
		this.setScale(0.5);

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

		// Ajustamos el "collider" de nuestro caballero
		this.bodyOffsetWidth = this.body.width/4;
		this.bodyOffsetHeight = this.body.height/6;
		this.bodyWidth = this.body.width/1.7;
		this.bodyHeight = this.body.height/1.055;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;
	}

	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutara la animacion
		super.preUpdate(t, dt);
		this.scene.expbar.width = 366* this.experience/this.maxExperience;
		this.scene.lifebar.width = 366* this.health/this.maxHealth;
		if(this.experience >= this.maxExperience) {
			this.experience = 0;
			this.maxExperience = this.levelExp[1];
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
			if(this.anims.currentAnim.key !== 'runWitch'){
				this.play('runWitch');
			}
			if (this.wKey.isDown || this.sKey.isDown){
				this.body.setVelocityX(-this.diagonalSpeed);
			}
			else{
				this.body.setVelocityX(-this.speed);
			}
		}

		// MOVERSE A LA DERECHA
		if(this.dKey.isDown){
			this.setFlipX(false);
			if(this.anims.currentAnim.key !== 'runWitch'){
				this.play('runWitch');
			}
			if (this.wKey.isDown || this.sKey.isDown){
				this.body.setVelocityX(this.diagonalSpeed);
			}
			else{
				this.body.setVelocityX(this.speed);
			}
		}

		// MOVERSE ARRIBA
		if(this.wKey.isDown){
			this.setFlipX(this.flipX)
			if(this.anims.currentAnim.key !== 'runWitch'){
				this.play('runWitch');
			}
			if (this.aKey.isDown || this.dKey.isDown){
				this.body.setVelocityY(-this.diagonalSpeed);
			}
			else{
				this.body.setVelocityY(-this.speed);
			}
		}

		// MOVERSE ABAJO
		if(this.sKey.isDown){
			this.setFlipX(this.flipX)
			if(this.anims.currentAnim.key !== 'runWitch'){
				this.play('runWitch');
			}
			if (this.aKey.isDown || this.dKey.isDown){
				this.body.setVelocityY(this.diagonalSpeed);
			}
			else{
				this.body.setVelocityY(this.speed);
			}
		}

		// Si dejamos de pulsar 'A' o 'D' volvemos al estado de animacion'idle'
		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey) || Phaser.Input.Keyboard.JustUp(this.wKey)|| Phaser.Input.Keyboard.JustUp(this.sKey)){
			if(this.anims.isPlaying === true){
				this.play('idleWitch');
			}
			this.body.setVelocityX(0);
			this.body.setVelocityY(0);
		}

		this.scene.levelText.setText([
			'Level: ' + this.level 
		]);
	}
	winExperience(){
		this.experience += 1;
	}
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

}