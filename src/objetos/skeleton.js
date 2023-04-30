import Enemy from "./enemy.js";
import ExpBall from "./expBall.js";

export default class Skeleton extends Enemy {
	constructor(scene, x, y) {
		let speed = 40;
		let health = 100;
		let damage=2;
		super(scene,x,y, speed, health, damage);

		this.damageJump=1;
		this.initialLifeJump=20;
		// this.x = super.x;


		this.scene.anims.create({
			key: 'walkSkeleton',
			frames: scene.anims.generateFrameNumbers('skeleton', {start:0, end:11}),
			frameRate: 7,
			repeat: -1
		});
		
		this.play('walkSkeleton');
		// COLLIDER
		this.body.setSize(this.width*0.25, this.height*0.55, true );
		// this.body.setOffset();
    
	}

    die(){
		new ExpBall(this.scene,this.x,this.y,'expBall');
		this.inactive();
		this.isAlive = false;
        this.x = -500;
        this.y = -500;
	}
    updatePosition(){
		
    }

    respawn(x, y){
		this.setVisible(true);
		this.setActive(true);
		this.isAlive = true;
		this.health = this.initialLife;
        this.x = x;
        this.y = y;
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.setFlipX(this.scene.witch.x > this.x ? false : true)
	}
    
}