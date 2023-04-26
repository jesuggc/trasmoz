export default class FireFlower extends Phaser.GameObjects.Image {
	constructor(scene, x, y,key) {
		super(scene, x, y,key);
		this.scene.add.existing(this);		
		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
	}
   
	recogerFlor(){
		this.scene.witch.guardarFlor(this);
		this.destroy();
	}

}