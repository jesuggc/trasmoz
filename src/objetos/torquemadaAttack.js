export default class TorquemadaAttack extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, objetive, damage) {
		super(scene, x, y, 'torqueAttack');
		this.speed = 200; // Nuestra velocidad de movimiento sera 140
		this.torque = this.scene.torquemada; 
		this.setScale(1);
		this.objetive = objetive;
		this.witch = this.scene.witch
		
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
		// Ajustamos el "collider" de nuestro ataque
		this.body.setSize(this.width*0.5,this.height*0.5,true)

		this.scene.time.addEvent({delay: 10000, callback: function(){
			this.destroy();
        }, callbackScope: this});
		this.scene.physics.moveTo(this,this.objetive.x, this.objetive.y,this.speed);
		
		
	}
   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
		if (this.scene.physics.overlap(this,this.witch )){
			this.witch.perderVida(this.damage);
			this.destroy();
		}
		else if (!this.witch.isAlive) this.destroy()		
	}

}