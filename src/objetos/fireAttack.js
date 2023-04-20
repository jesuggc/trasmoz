export default class FireAttack extends Phaser.GameObjects.Sprite {

    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */
    constructor(scene, witch, x, y, damage){
        super(scene, x, y, 'fireAttack');
    
        this.witch = witch;
        // this.objetive = objetive;
        this.scene.add.existing(this);
        this.damage = damage;

        let animation = this.scene.anims.create({
            key: 'idleFireAttack',
            frames: scene.anims.generateFrameNumbers('fireAttack', {start:0, end: 25}),
            frameRate: 35,
            repeat: 0
        });

        this.play('idleFireAttack');
        
        this.scene.physics.add.existing(this);
        this.setVisible(false);
            this.body.enable= false;
        // this.body.onCollide = true;
        // this.scene.physics.add.collider(this, this.objective, this.burn, null, this);

        // sthis.scene.physics.overlap(this, )

        this.on('animationcomplete', function (anim, frame) {
            this.setVisible(false);
            this.body.enable= false;
        }, this);

    }

    preUpdate(t,dt){
        super.preUpdate(t, dt);

        if(this.body.enable){
            this.x = this.witch.x;
            this.y = this.witch.y;
        }
    }

    // addCollider(muchosLobos, callbackObj) {
    //     this.scene.physics.add.collider(muchosLobos, this, function(lobo) {
    //         callbackObj.burn(lobo, this);
    //     });
    // }
    
    // burn(objetive, fireAttack){
    //     consolelog("quemo");
    //     this.objetive.receiveDamage(this.damage);
    //     this.destroy();
    // }
    
}