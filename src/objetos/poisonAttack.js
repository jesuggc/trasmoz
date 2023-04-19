export default class PoisonAttack extends Phaser.GameObjects.Sprite {
    /**
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */
   constructor(scene, x, y, damage){
        super(scene, x, y, 'poisonAttack');

        this.witch = this.scene.witch;

        this.scene.add.existing(this);
        this.damage = damage;

        this.scene.anims.create({
            key: 'idlePoisonAttack',
            frames: scene.anims.generateFrameNumbers('poisonAttack', {start:0, end: 25}),
            frameRate: 20,
            repeat: -1
        });

        this.play('idlePoisonAttack');

        this.scene.physics.add.existing(this);
        this.body.onCollide = true;
   }

   preUpdate(t,dt){
    super.preUpdate(t, dt);
}
}