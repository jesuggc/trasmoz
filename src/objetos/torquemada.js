import Enemy from "./enemy.js";

export default class Torquemada extends Enemy {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y,10,40,2);
		this.health = 10000;
		this.maxHealth = 10000;
		this.estaAtacando = false;
		this.body.pushable=false;
		this.damage=50;

        this.scene.anims.create({
			key: 'nonameidle',
			frames: scene.anims.generateFrameNumbers('torquemada', {start:0, end:0}),
			frameRate: 1,
			repeat: 0
		});

		// BARRA DE VIDA
		this.lifebar = this.scene.add.rectangle(this.x,this.y,170,6,0xff0000).setDepth(3);
		this.lifebarS = this.scene.add.rectangle(this.x,this.y,170,6,0x000000).setDepth(2);
		
		this.play('nonameidle');
		
		// COLLIDER
		this.body.setSize(this.body.width, this.body.height);

		// this.body.setOffset(this.body.width/5, this.body.height / 10);
        this.body.setSize(this.body.width/2, this.body.height);
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x > this.x) this.setFlipX(true);
        else this.setFlipX(false);

		this.dinamicLifebar(this.lifebar, this.lifebarS);
		if(this.health <= this.maxHealth/2){
			this.generateEnemies();
		}

	}
    dinamicLifebar(lb,lbs){
		lb.width = 170 * this.health/this.maxHealth;
		lb.x = this.x;
		lb.y = this.y + this.height;
		lbs.x = this.x;
		lbs.y = this.y + this.height;

	}
	
	generateEnemies(){

	}

	attack() {
		super.attack();
	}
}