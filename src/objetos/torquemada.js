import Enemy from "./enemy.js";

export default class Torquemada extends Enemy {
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
			key: 'nonameidle',
			frames: scene.anims.generateFrameNumbers('torquemada', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});

		
		
		
		// COLLIDER
		this.play('nonameidle');
		
		// this.body.setOffset(this.body.width/5, this.body.height / 10);
        this.body.setSize(this.body.width/2, this.body.height);
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x > this.x) this.setFlipX(true);
        else this.setFlipX(false);
		
	}
    
	
	attack() {
	}
}