export default class FreezeAttack extends Phaser.GameObjects.Sprite {
    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */

    constructor(scene, x, y, damage){
        super(scene, x, y, 'freezeAttack');

        this.scene.add.existing(this);
        this.damage = damage;

        this.scene.anims.create({
            key: 'idleFreezeAttack',
            frames: scene.anims.generateFrameNumbers('freezeAttack', {start: 0, end: 25}),
            frameRate: 15,
            repeat: -1
        });

        this.play('idleFreezeAttack');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;

        this.scene.time.addEvent({delay: 2000, callback: function(){
            this.destroy();
        }, callbackScope: this});

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }
}