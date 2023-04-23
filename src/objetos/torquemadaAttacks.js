export default class TorquemadaAttack extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, objetive, damage) {
		super(scene, x, y, 'torqueAttack');
		this.speed = 17; // Nuestra velocidad de movimiento sera 140
		this.torque = this.scene.torquemada; 
		this.setScale(1);
		this.witch = this.scene.witch;
		
		this.damage = 93;
        
		this.scene.anims.create({
			key: 'idleTAttack',
			frames: scene.anims.generateFrameNumbers('torqueAttack', {start:0, end:44}),
			frameRate: 50,
			repeat: -1
		});
		
		this.play('idleTAttack');
		
		this.scene.add.existing(this);

		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
		this.scene.physics.add.collider(this, this.witch , this.isShooted, null, this);

		// Ajustamos el "collider" de nuestro ataque
		this.bodyOffsetWidth = this.body.width/4;
		this.bodyOffsetHeight = this.body.height/4;
		this.bodyWidth = this.body.width/3;
		this.bodyHeight = this.body.height/3;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;

		this.scene.time.addEvent({delay: 10000, callback: function(){
			this.destroy();
        }, callbackScope: this});
		this.scene.physics.moveTo(this,this.witch.x, this.witch.y,200);
		
	}
   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.radianAngle = Phaser.Math.Angle.Between(this.x, this.y, this.witch.x, this.witch.y);
		this.setRotation(this.radianAngle);
		
		// this.scene.physics.moveToObject(this,this.witch , this.speed);
		if (this.scene.physics.overlap(this,this.witch )){
			this.witch.receiveDamage(this.damage);
			this.destroy();
		}
		
		else if (!this.witch.isAlive) this.destroy()          
	}
    
	// resetCollider(){
	// 	this.body.width = this.bodyWidth;
	// 	this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	// }

	isShooted(){
		console.log(this.torque.damage);
		this.witch.perderVida(this.damage);
		this.destroy();
	}

}