export default class ExpBall extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene 
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(scene, x, y) {
		super(scene, x, y);
		this.experience = 10000;
		this.setScale(0.25);
		this.scene.add.existing(this);
        this.setScale(0.5);
        
		this.scene.anims.create({
			key: 'idleexpBall',
			frames: scene.anims.generateFrameNumbers('expBall', {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});
		
		this.play('idleexpBall');
		
		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
		this.scene.physics.add.collider(this, this.scene.witch, this.getExp, null, this);

		// COLLIDER
		this.body.setOffset(this.body.width * 31, this.body.height / 2);
        this.body.setSize(this.body.width* 1.6, this.body.height*1.6);
        
        
		
	}
   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
	}
    
	getExp(){
        this.scene.witch.winExperience(this.experience);
        this.destroy();
	}

}