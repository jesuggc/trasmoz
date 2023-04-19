import Enemy from "./enemy.js";

export default class Wolf extends Enemy {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y);
		this.initialLife = 20;
		this.health = this.initialLife;
		this.setScale(0.5);
<<<<<<< HEAD
		this.isAlive = true;

		this.scene.add.existing(this);
		scene.physics.add.existing(this);
=======
>>>>>>> ramaElena

        this.scene.anims.create({
			key: 'walkWolf',
			frames: scene.anims.generateFrameNumbers('wolf', {start:0, end:4}),
			frameRate: 7,
			repeat: -1
		});

		this.play('walkWolf');
<<<<<<< HEAD
		this.onCollide = true;
=======
>>>>>>> ramaElena

		// COLLIDER
		this.bodyOffsetWidth = this.body.width/2;
		this.bodyOffsetHeight = this.body.height/3.5;
		this.bodyWidth = this.body.width/3;
		this.bodyHeight = this.body.height/3;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x < this.x) this.setFlipX(true);
        else this.setFlipX(false);
<<<<<<< HEAD
		if (this.health <= 0) this.die();
	}
    
	die(){
		this.isAlive = false;
		new ExpBall(this.scene,this.x,this.y);
		this.setVisible(false);
		this.setActive(false);
		this.respawn();
	}
    
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

	respawn(){
		this.y = this.scene.generateRandomY();
		this.x = this.scene.generateRandomX(this.y);
		this.setVisible(true);
		this.setActive(true);
		this.isAlive = true;
		this.health = this.initialLife;
	}
	receiveDamage(damage){
		this.health -= damage;
		this.setVisible(false);
		this.scene.time.addEvent({delay: 90, callback: function(){
			this.setVisible(true);
        }, callbackScope: this});
		this.damageText = this.scene.add.text(this.x-20, this.y-20, damage, { fontFamily: 'titulo' });
		this.damageText.setResolution(10).setStroke(0x000000,2);
=======
>>>>>>> ramaElena
		
	}	
}