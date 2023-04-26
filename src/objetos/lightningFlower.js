export default class LightningFlower extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene 
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(scene, x, y) {
		super(scene, x, y);
		this.scene.add.existing(this);
		this.setScale(1)

		this.scene.anims.create({
			key: 'idleLightningFlower',
			frames: scene.anims.generateFrameNumbers('lightningFlower', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});
		this.play('idleLightningFlower');
		
		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
		 


		// COLLIDER
		this.body.setOffset(this.body.width * 31, this.body.height / 2);
		this.body.setSize(this.body.width, this.body.height);        
        
		
	}
   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
	}

	recogerFlor(){
		console.log("hola");
		this.scene.witch.guardarFlor(this);
		this.body.destroy();
		this.destroy();
		
	}

}