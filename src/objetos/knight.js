import Enemy from "./enemy.js";

export default class Knight extends Enemy {
	constructor(scene) {
		let speed = 40;
		let health = 40;
		let damage=2.25;
		super(scene, speed, health, damage);

		this.estaAtacando = false;
		this.damageJump=1;
		this.initialLifeJump=20;
		// this.x = super.x;


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
		
		
		this.play('walkKnight');
		// COLLIDER
		this.body.setSize(this.width*0.25, this.height*0.55, true );
		// this.body.setOffset();
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.setFlipX(this.scene.witch.x > this.x ? true : false)
	}
    
	
	// attack() {
	// 	super.attack();		
		
	// 		if (!this.estaAtacando) {
	// 			this.estaAtacando = true;

	// 			this.play('attackKnight');
	// 			var self = this;
	// 			setTimeout(function () {
	// 				self.estaAtacando = false;
	// 				self.play('walkKnight');
	// 			}, 600);

	// 		}
	// 	}
}