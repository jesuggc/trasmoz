export default class WitchAttack extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, objetive, damage) {
		super(scene, x, y, 'witchAttack');
		
		this.speed = 70;
		this.witch = this.scene.witch;
		this.damage = damage;
		this.setScale(0.25);
		this.objetive = objetive;
		        
		this.scene.anims.create({
			key: 'idleAttack',
			frames: scene.anims.generateFrameNumbers('witchAttack', {start:0, end:8}),
			frameRate: 15,
			repeat: -1
		});
		
		this.play('idleAttack');
		
		this.radianAngle = Phaser.Math.Angle.Between(x, y, objetive.x, objetive.y);
		this.setRotation(this.radianAngle);
		this.scene.add.existing(this);

		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
		this.scene.physics.add.collider(this, this.objetive, this.isShooted, null, this);

		// Ajustamos el "collider" de nuestro ataque
		this.bodyOffsetWidth = this.body.width/4;
		this.bodyOffsetHeight = this.body.height/6+20;
		this.bodyWidth = this.body.width/1.7;
		this.bodyHeight = this.body.height/2;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;

		this.scene.time.addEvent({delay: 2000, callback: function(){
			this.destroy();
        }, callbackScope: this});
		
	}
   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.radianAngle = Phaser.Math.Angle.Between(this.x, this.y, this.objetive.x, this.objetive.y);
		this.setRotation(this.radianAngle);
		
		this.scene.physics.moveToObject(this,this.objetive, 170);            
		if (!this.objetive.isAlive) this.destroy()
	}
    
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

	isShooted(){
		this.objetive.receiveDamage(this.damage);
		this.destroy();
	}

}