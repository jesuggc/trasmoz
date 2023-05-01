export default class PoisonAttack extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, objetive) {
        super(scene, x, y, 'poisonAttack');

        this.witch = this.scene.witch;


        this.setScale(1);
        this.objetive = objetive;
        this.scene.add.existing(this);
        this.damage = 5;
        this.scene.anims.create({
            key: 'idlePoisonAttack',
            frames: scene.anims.generateFrameNumbers('poisonAttack', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.play('idlePoisonAttack');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.scene.physics.add.overlap(this, this.objetive, this.poison, null, this);

        // // this.scene.time.addEvent({
        //     delay: 2000, callback: function () {
        //         this.destroy();
        //     }, callbackScope: this
        // });

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        this.radianAngle = Phaser.Math.Angle.Between(this.x, this.y, this.objetive.x, this.objetive.y);
        this.setRotation(this.radianAngle);

        this.scene.physics.moveToObject(this, this.objetive, 170);
        if (!this.objetive.isAlive) this.destroy()
    }

    poison() {
        this.objetive.poison();
        this.destroy();
    }
}