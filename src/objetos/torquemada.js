import Enemy from "./enemy.js";
import TorquemadaAttack from "./torquemadaAttacks.js";
import Witch from "./witch.js";
export default class Torquemada extends Enemy {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y,10,40,2);
		this.x=x;
		this.y=y;
		this.health = 10000;
		this.maxHealth = 10000;
		this.estaAtacando = false;
		this.body.pushable=false;
		this.damage=5;
		this.lastBasicAttack = 0;
		this.rate = 2000;
        this.scene.anims.create({
			key: 'torquemadaidle',
			frames: scene.anims.generateFrameNumbers('torquemada', {start:0, end:1}),
			frameRate: 1,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'attackTorquemada',
			frames: scene.anims.generateFrameNumbers('torquemadaAttack', {start:0, end:6}),
			frameRate: 18,
			repeat: 0
		});
		// BARRA DE VIDA
		this.lifebar = this.scene.add.rectangle(this.x,this.y,170,6,0xff0000).setDepth(3);
		this.lifebarS = this.scene.add.rectangle(this.x,this.y,170,6,0x000000).setDepth(2);
		
		this.play('torquemadaidle');
		
		// COLLIDER
		this.body.setSize(this.body.width, this.body.height);

		// this.body.setOffset(this.body.width/5, this.body.height / 10);
        this.body.setSize(this.body.width/2, this.body.height);
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		
        if (this.witch.x < this.x) this.setFlipX(true);
        else this.setFlipX(false);
		
		this.dinamicLifebar(this.lifebar, this.lifebarS);
		
		if (t > this.lastBasicAttack + this.rate) {	
			this.estaAtacando = true;
			this.play('attackTorquemada');
			if (this.scene.witch.isAlive && this.scene.witch instanceof Witch ) new TorquemadaAttack(this.scene, this.x, this.y, this.scene.witch, this.damage);
			
			this.lastBasicAttack = t;
			var self = this;
				setTimeout(function () {
					self.estaAtacando = false;
					self.play('torquemadaidle');
				}, 600);
		}
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
		lb.setDepth(3);
	}
	
	generateEnemies(){

	}

}