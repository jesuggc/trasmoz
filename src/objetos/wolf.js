import Enemy from "./enemy.js";

export default class Wolf extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, 50,20,2);
		this.setScale(0.5);
		this.damage=2;
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
		console.log("Vida lobo: ",this.initialLife)
        if (this.witch.x < this.x) this.setFlipX(true);
        else this.setFlipX(false);
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