export default class ExpBall extends Phaser.GameObjects.Image {
	constructor(scene, x, y,key) {
		super(scene, x, y,key);
		this.experience = 10;
		this.scene.add.existing(this);
        this.setScale(0.5);

		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
		this.scene.physics.add.collider(this, this.scene.witch, this.getExp, null, this);

		// COLLIDER
		this.body.setSize(this.width, this.height, true );
	}
	
	getExp(){		
        this.scene.witch.winExperience(this.experience);
        this.destroy();
	}

}