import Enemy from "./enemy.js";

export default class Wolf extends Enemy {
	constructor(scene) {
		let speed = 50;
		let health = 20;
		let damage=1.5;
		super(scene, speed, health,damage);
		this.setScale(0.5);
		this.damageJump=1;
		this.initialLifeJump=10;

        this.scene.anims.create({key: 'walkWolf',
			frames: scene.anims.generateFrameNumbers('wolf', {start:0, end:4}),
			frameRate: 7,
			repeat: -1
		});

		this.play('walkWolf');
		
		// COLLIDER
		this.body.setSize(this.width, this.height, true );
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.setFlipX(this.scene.witch.x > this.x ? false : true)

	}

	decreaseSpeed(){
		this.speed = 0;
		this.wolf.diagonalSpeed = 0;
	}
	increaseSpeed(){
		this.speed =0 ;
		this.diagonalSpeed = 0;
	}

}