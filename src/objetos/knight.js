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
		this.attacking = false;
        this.scene.anims.create({
			key: 'walkKnight',
			frames: scene.anims.generateFrameNumbers('knight', {start:0, end:8}),
			frameRate: 7,
			repeat: -1
		});

        this.scene.anims.create({
			key: 'attackKnight',
			frames: scene.anims.generateFrameNumbers('knightAttack', {start:0, end:7}),
			frameRate: 12,
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
		if (!this.attacking) {

			
			this.play("attackKnight").on('animationcomplete', () => {
				this.attacking = true;
				this.play("walkKnight");
			});
			this.attacking = false;
		}
	}
}