export default class LightningAttack extends Phaser.GameObjects.Sprite {
    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */

    constructor(scene, x, y, damage){
        super(scene, x, y , 'lightningAttack');

        this.witch = this.scene.witch;
        this.damage = damage;
        this.scene.add.existing(this);

        this.scene.anims.create({
            key: 'idleLightningAttack',
            frames: scene.anims.generateFrameNumbers('lightningAttack', {start:0, end:8}),
            frameRate: 15,
            repeat: -1
        });

        this.play('idleLightningAttack');

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




