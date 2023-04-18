export default class IceFlower extends Phaser.GameObjects.Sprite {
    /**
	 * @param {Scene} scene 
	 * @param {number} x 
	 * @param {number} y 
	 */

    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.add.existing(this);
        this.setScale(1);

        this.scene.anims.create({
            key: 'idleIceFlower',
            frames: scene.anims.generateFrameNumbers('iceFlower', {star: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        });

        this.play('idleIceFlower');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;

        this.body.setOffset(this.body.width * 31, this.body.height / 2);
        this.body.setSize(this.body.width* 1.6, this.body.height*1.6);

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }

    recogerFlor(){
        console.log("hola");
        this.scene.witch.guardarFlor(this);
        this.body.destroy();
        this.destroy();
    }
}