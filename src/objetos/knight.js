import Enemy from "./enemy.js";

export default class Knight extends Enemy {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y);
		this.initialLife = 40;
		this.health = this.initialLife; 
		this.damage = 3;

		this.estaAtacando = false;

        this.scene.anims.create({
			key: 'walkKnight',
			frames: scene.anims.generateFrameNumbers('knight', {start:0, end:7}),
			frameRate: 7,
			repeat: -1
		});

        this.scene.anims.create({
			key: 'attackKnight',
			frames: scene.anims.generateFrameNumbers('knightAttack', {start:0, end:6}),
			frameRate: 18,
			repeat: 0
		});
		
		
		
		// COLLIDER
		this.play('walkKnight');
		
		// this.body.setOffset(this.body.width/5, this.body.height / 10);
        this.body.setSize(this.body.width/2, this.body.height);
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x > this.x) this.setFlipX(true);
        else this.setFlipX(false);
		
	}
    
	
	attack() {
		super.attack();		
		
			if (!this.estaAtacando) {
				// Establecer la variable de estado a verdadero para indicar que se está reproduciendo la animación de ataque
				this.estaAtacando = true;

				// Reproducir la animación de ataque
				this.play('attackKnight');
				var self = this;
				// Establecer un temporizador para restablecer la variable de estado después de un tiempo determinado
				setTimeout(function () {
					self.estaAtacando = false;
					self.play('walkKnight');
				}, 600); // Cambiar 1000 por el tiempo en milisegundos que dura la animación de ataque

			}
		}
}