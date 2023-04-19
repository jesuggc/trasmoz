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

		// this.body.setOffset(this.body.width/5, this.body.height / 10);
        this.body.setSize(this.body.width/2, this.body.height);
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x > this.x) this.setFlipX(true);
        else this.setFlipX(false);
		
	}
    
	attack(){
		super.attack();
		console.log("🚀 ~ file: knight.js:48 ~ Knight ~ attack ~ u:")
		
		this.play('attackKnight');
	}
}