export default class Knight extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'knight');
		this.speed = 140; // Nuestra velocidad de movimiento será 140
		this.diagonalSpeed = 99 //calculado por pitagoras

		this.setScale(0.5);

		this.disableJump(); // Por defecto no podemos saltar hasta que estemos en una plataforma del juego
		this.isAttacking = false;

		this.scene.add.existing(this); //Añadimos el caballero a la escena

		// Creamos las animaciones de nuestro caballero
		this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers('knight', {start:0, end:3}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'attack',
			frames: scene.anims.generateFrameNumbers('knight', {start:4, end:7}),
			frameRate: 18,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'run',
			frames: scene.anims.generateFrameNumbers('knight', {start:8, end:14}),
			frameRate: 5,
			repeat: -1
		});
		

		// Si la animación de ataque se completa pasamos a ejecutar la animación 'idle'
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'attack'){
				this.stopAttack()
			}
		})

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('idle');

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
		this.ctrKey = this.scene.input.keyboard.addKey('SPACE'); //atacar

		// Agregamos el caballero a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);

		// Decimos que el caballero colisiona con los límites del mundo
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

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A' movelos el personaje en la X
		if(this.aKey.isDown && !this.isAttacking){
			this.setFlip(true, false)
			if(this.anims.currentAnim.key !== 'run'){
				this.play('run');
			}
			
			//this.x -= this.speed*dt / 1000;
			if (this.wKey.isDown || this.sKey.isDown){
				this.body.setVelocityX(-this.diagonalSpeed);
			}
			else{
				this.body.setVelocityX(-this.speed);
			}
		}

		// Mientras pulsemos la tecla 'D' movelos el personaje en la X
		if(this.dKey.isDown && !this.isAttacking){
			this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'run'){
				this.play('run');
			}
			//this.x += this.speed*dt / 1000;
			if (this.wKey.isDown || this.sKey.isDown){
				this.body.setVelocityX(this.diagonalSpeed);
			}
			else{
				this.body.setVelocityX(this.speed);
			}
		}

		// Mientras pulsemos la tecla 'D' movelos el personaje en la X
		if(this.wKey.isDown && !this.isAttacking){
			this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'run'){
				this.play('run');
			}
			//this.x += this.speed*dt / 1000;
			if (this.aKey.isDown || this.dKey.isDown){
				this.body.setVelocityY(-this.diagonalSpeed);
			}
			else{
				this.body.setVelocityY(-this.speed);
			}
		}

		// Mientras pulsemos la tecla 'D' movelos el personaje en la X
		if(this.sKey.isDown && !this.isAttacking){
			this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'run'){
				this.play('run');
			}
			//this.x += this.speed*dt / 1000;
			if (this.aKey.isDown || this.dKey.isDown){
				this.body.setVelocityY(this.diagonalSpeed);
			}
			else{
				this.body.setVelocityY(this.speed);
			}
		}

		// Si dejamos de pulsar 'A' o 'D' volvemos al estado de animación'idle'
		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey) || Phaser.Input.Keyboard.JustUp(this.wKey)|| Phaser.Input.Keyboard.JustUp(this.sKey)){
			if(this.anims.currentAnim.key !== 'attack' && this.anims.isPlaying === true){
				this.play('idle');
			}
			this.body.setVelocityX(0);
			this.body.setVelocityY(0);
		}
		
		// Si pulsamos 'CTRL' atacamos
		if(Phaser.Input.Keyboard.JustDown(this.ctrKey)){
			this.attack();
		}
	}

	/**
	 * Cambiamos la propiedad jumpDisabled a true para indicar que el personaje no puede saltar
	 */
	disableJump(){
		this.jumpDisabled = true;
	}

	/**
	 * Cambiamos la propiedad jumpDisabled a true para indicar que el personaje puede volver a ejecutar un salto
	 */
	enableJump(){
		this.jumpDisabled = false;
	}

	/**
	 * EjecutrunDisabledamos un ataque
	 */
	attack(){
		this.isAttacking = true;
		this.play('attack');
		// Ajustamos el "collider" de nuestro caballero según hacia donde miremos
		this.body.width = this.bodyWidth*2;
		if(this.flipX){
			this.body.setOffset(-this.bodyOffsetWidth, 0);
		} 
	}

	/**
	 * Terminamos el ataque
	 */
	stopAttack(){
		this.stop()
		this.play('idle');
		this.isAttacking = false;
		// Ajustamos el "collider" de nuestro caballero según hacia donde miremos		
		this.resetCollider()
	}

	isAttackInProcess(){
		return this.isAttacking;
	}

	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

}