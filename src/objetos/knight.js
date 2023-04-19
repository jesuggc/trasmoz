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

        this.scene.anims.create({
			key: 'walkKnight',
			frames: scene.anims.generateFrameNumbers('knight', {start:0, end:8}),
			frameRate: 7,
			repeat: -1
		});

        this.scene.anims.create({
			key: 'attackKnight',
			frames: scene.anims.generateFrameNumbers('knightAttack', {start:0, end:7}),
			frameRate: 7,
			repeat: -1
		});
		this.play('walkKnight');

		

		// COLLIDER
		this.bodyOffsetWidth = this.body.width/1.1;
		this.bodyOffsetHeight = this.body.height/2;
		this.bodyWidth = this.body.width/2;
		this.bodyHeight = this.body.height;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x > this.x) this.setFlipX(true);
        else this.setFlipX(false);
		
	}
    
	
}