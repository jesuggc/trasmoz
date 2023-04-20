import Enemy from "./enemy.js";

export default class Torquemada extends Enemy {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y,10,40,2);

		this.estaAtacando = false;

        this.scene.anims.create({
			key: 'nonameidle',
			frames: scene.anims.generateFrameNumbers('torquemada', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});

		// BARRA DE VIDA
		this.lifebar = this.scene.add.rectangle(this.x,this.y,170,6,0xff0000).setDepth(3);
		this.lifebarS = this.scene.add.rectangle(this.x,this.y,170,6,0x000000).setDepth(2);

		
		
		// COLLIDER
		this.play('nonameidle');
		
		// this.body.setOffset(this.body.width/5, this.body.height / 10);
        this.body.setSize(this.body.width/2, this.body.height);
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x > this.x) this.setFlipX(true);
        else this.setFlipX(false);
		this.lifebar.x = this.x
		this.lifebar.y = this.y
		this.lifebarS.x = this.x
		this.lifebarS.y = this.y
		// this.lifebar.setY(y)
	}
    
	
	attack() {
	}
}