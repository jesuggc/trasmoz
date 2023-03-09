export default class Witch extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Bruja, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'witch');
		this.speed = 140; // Nuestra velocidad de movimiento será 140
		this.diagonalSpeed = 99 //calculado por pitagoras

		this.setScale(0.5);

		this.scene.add.existing(this); //Añadimos el caballero a la escena

		// Creamos las animaciones de nuestro caballero
		this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers('witch', {start:7, end:7}),
			frameRate: 5,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'run',
			frames: scene.anims.generateFrameNumbers('witch', {start:0, end:7}),
			frameRate: 5,
			repeat: -1
		});
		

	

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('idle');

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); 
		this.aKey = this.scene.input.keyboard.addKey('A'); 
		this.sKey = this.scene.input.keyboard.addKey('S'); 
		this.dKey = this.scene.input.keyboard.addKey('D'); 


		// Agregamos la bruja a las físicas para que Phaser lo tenga en cuenta
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
		if(this.aKey.isDown){
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
		if(this.dKey.isDown){
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
		if(this.wKey.isDown){
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
		if(this.sKey.isDown){
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
			if(this.anims.isPlaying === true){
				this.play('idle');
			}
			this.body.setVelocityX(0);
			this.body.setVelocityY(0);
		}
	}

	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

}