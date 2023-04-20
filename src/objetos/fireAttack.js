export default class FireAttack extends Phaser.GameObjects.Sprite {

    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */
    constructor(scene, x, y, damage){
        super(scene, x, y, 'fireAttack');

        this.witch = this.scene.witch;
        // this.objetive = objetive;
        this.scene.add.existing(this);
        this.damage = damage;

        this.scene.anims.create({
            key: 'idleFireAttack',
            frames: scene.anims.generateFrameNumbers('fireAttack', {start:0, end: 25}),
            frameRate: 20,
            repeat: -1
        });

        this.play('idleFireAttack');
        
        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
        // this.scene.physics.add.collider(this, this.objective, this.burn, null, this);

        // sthis.scene.physics.overlap(this, )

        this.scene.time.addEvent({delay: 1000, callback: function(){
            this.destroy();
        }, callbackScope: this});

    }

    preUpdate(t,dt){
        super.preUpdate(t, dt);
        
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