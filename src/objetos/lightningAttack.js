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
        // this.objective = objective;
        this.scene.add.existing(this);

        this.scene.anims.create({
            key: 'idleLightningAttack',
            frames: scene.anims.generateFrameNumbers('lightningAttack', {start:3, end:12}),
            frameRate: 7,
            repeat: -1
        });

        this.play('idleLightningAttack');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;

        this.scene.time.addEvent({delay: 1000, callback: function(){
            this.destroy();
        }, callbackScope: this});
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);
       
    }
    
    
}




