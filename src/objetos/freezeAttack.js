export default class FreezeAttack extends Phaser.GameObjects.Sprite {
       constructor(scene, x, y, objetive, damage){
        super(scene, x, y, 'freezeAttack');

        this.setScale(0.25);
        this.scene.add.existing(this);
        this.objetive = objetive;
        this.damage = damage;
        this.damageCooldown = 4000;
        this.time = 1000;
        this.attack = this
        this.scene.anims.create({
            key: 'idleFreezeAttack',
            frames: scene.anims.generateFrameNumbers('freezeAttack', {start: 0, end: 5}),
            frameRate: 15,
            repeat: -1
        });

        this.play('idleFreezeAttack');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;

        this.collider =  this.scene.physics.add.overlap(this, this.objetive, this.freeze, null, this);

        

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.radianAngle = Phaser.Math.Angle.Between(this.x, this.y, this.objetive.x, this.objetive.y);
		this.setRotation(this.radianAngle);
        this.scene.physics.moveToObject(this,this.objetive, this.speed);            
    }

    freeze(){
		this.objetive.decreaseSpeed();
        this.destroy();
    }
}