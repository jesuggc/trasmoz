export default class FreezeAttack extends Phaser.GameObjects.Sprite {
    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */

    constructor(scene, x, y, objetive, damage){
        super(scene, x, y, 'freezeAttack');

        this.setScale(0.25);
        this.scene.add.existing(this);
        this.objetive = objetive;
        this.damage = damage;
        this.radianAngle = Phaser.Math.Angle.Between(x, y, objetive.x, objetive.y);
		this.setRotation(this.radianAngle);


        this.scene.anims.create({
            key: 'idleFreezeAttack',
            frames: scene.anims.generateFrameNumbers('freezeAttack', {start: 0, end: 5}),
            frameRate: 15,
            repeat: -1
        });

        this.play('idleFreezeAttack');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;

        this.scene.physics.add.collider(this, this.objetive, this.freeze, null, this);

        this.scene.time.addEvent({delay: 1000, callback: function(){
            this.destroy();
        }, callbackScope: this});

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.radianAngle = Phaser.Math.Angle.Between(this.x, this.y, this.objetive.x, this.objetive.y);
		this.setRotation(this.radianAngle);

        this.scene.physics.moveToObject(this,this.objetive, 170);            

    }

    freeze(){
		this.objetive.decreaseSpeed();
		this.destroy();
    }
}