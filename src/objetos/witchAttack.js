export default class WitchAttack extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, objetive, damage) {
		super(scene, x, y, 'witchAttack');
		this.speed = 170; 
		this.witch = this.scene.witch;
		this.objetive = objetive;
		        
		this.scene.anims.create({
			key: 'idleAttack',
			frames: scene.anims.generateFrameNumbers('witchAttack', {start:0, end:44}),
			frameRate: 50,
			repeat: -1
		});
		
		this.play('idleAttack');
		
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.onCollide = true;

		this.body.setSize(this.width*0.4, this.height*0.4, true)

		this.scene.time.addEvent({delay: 2000, callback: function(){ this.destroy(); }, callbackScope: this});
		
	}
   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.radianAngle = Phaser.Math.Angle.Between(this.x, this.y, this.objetive.x, this.objetive.y);
		this.setRotation(this.radianAngle);
		
		this.scene.physics.moveToObject(this,this.objetive, this.speed);
		if (this.scene.physics.overlap(this,this.objetive)){
			
			this.objetive.receiveDamage(this.witch.damage);
			this.destroy();
		}
		
		if (!this.objetive.isAlive) this.destroy()          
	}
    
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

	isShooted(){
		this.objetive.receiveDamage(this.witch.damage);
		this.destroy();
	}

}