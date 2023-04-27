export default class FireAttack extends Phaser.GameObjects.Sprite {
    constructor(scene, witch, x, y, damage){
        super(scene, x, y, 'fireAttack');
    
        this.witch = witch;
        this.scene.add.existing(this);
        this.damage = damage;

        let animation = this.scene.anims.create({
            key: 'idleFireAttack',
            frames: scene.anims.generateFrameNumbers('fireAttack', {start:0, end: 26}),
            frameRate: 35,
            repeat: 0
        });

        this.play('idleFireAttack');
        
        this.scene.physics.add.existing(this);
        
        this.body.onCollide = true;
        this.scene.physics.add.collider(this, this.objective, this.burn, null, this);

        this.scene.time.addEvent({delay: 1000, callback: function(){
            this.destroy()
        }, callbackScope: this});

    }

    preUpdate(t,dt){
        super.preUpdate(t, dt);

        if(this.body.enable){
            this.x = this.witch.x;
            this.y = this.witch.y;
        }
    }
    
}