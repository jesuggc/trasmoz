export default class LightningAttack extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y){
        super(scene, x, y , 'lightningAttack');

        this.witch = this.scene.witch;
        this.damage = 50;
        this.scene.add.existing(this);

        this.scene.anims.create({
            key: 'idleLightningAttack',
            frames: scene.anims.generateFrameNumbers('lightningAttack', {start:3, end:10}),
            frameRate: 20,
            repeat: 0
        });

        this.play('idleLightningAttack');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        
        this.on('animationcomplete', function (anim, frame) {
            this.destroy();
        }, this);
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);
       
    }
    
    
}




