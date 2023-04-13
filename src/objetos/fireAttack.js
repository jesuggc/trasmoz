export default class FireAttack extends Phaser.GameObjects.Sprite {

    /**
         * @param {Scene} scene - escena en la que aparece
         * @param {number} x - coordenada x
         * @param {number} y - coordenada y
         */

    constructor (scene, x, y, objetive, damage){
        super(scene, x, y, 'fireAttack');

        this.setScale(1);

        let.circle = this.add.graphics();
        circle.fillStyle(0xff0000, 0,5);
        circle.fillCircle(this.scene.witch.x, this.scene.witch.y, 100);

        this.scene.anims.create({
			key: 'idleFireAttack',
			frames: scene.anims.generateFrameNumbers('witchAttack', {start:0, end:8}),
			frameRate: 15,
			repeat: -1
		});
		

    }
}