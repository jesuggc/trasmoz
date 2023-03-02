export default class Box extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'box');
		this.setScale(0.5,.5);
		this.scene.add.existing(this); //Añadimos la caja a la escena

		// Creamos las animaciones de nuestra caja
		this.scene.anims.create({
			key: 'none',
			frames: scene.anims.generateFrameNumbers('box', {start:0, end:0}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'hit',
			frames: scene.anims.generateFrameNumbers('box', {start:1, end:4}),
			frameRate: 18,
			repeat: 0
		});

		// Si la animación de ataque se completa pasamos a ejecutar la animación 'idle'
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'hit'){
				new Box(scene, Phaser.Math.Between(50, scene.sys.game.canvas.width-100),20, colliderGroup);
				this.setActive(false).setVisible(false);
				this.toDestroy = true;
			}
		})

		this.play('none');

		// Agregamos la caja a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);

		// Decimos que la caja colisiona con los límites del mundo
		this.body.setCollideWorldBounds();

		colliderGroup.add(this);
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		if(this.body.velocity.x > 5){
			this.body.velocity.x -= 5;
		} else if(this.body.velocity.x < -5){
			this.body.velocity.x += 5;
		}

		if(this.body.velocity.x <= 5 && this.body.velocity.x > 0 || this.body.velocity.x >= -5 && this.body.velocity.x < 0){
			 this.body.velocity.x = 0;
		}

		// Si es necesario, la caja la destruimos al final del update para evitar errores
		if(this.toDestroy){
			this.destroy();
		}

	}

	/**
	 * Cambiamos la propiedad jumpDisabled a true para indicar que el personaje no puede saltar
	 */
	destroyMe(){
		this.play('hit');

	}
}