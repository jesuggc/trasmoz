import Enemy from "./enemy.js";
import TorquemadaAttack from "./torquemadaAttack.js";
import Witch from "./witch.js";
export default class Torquemada extends Enemy {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y,0,10000,5);
		this.setVisible(true);
		this.setActive(true);
		this.maxHealth = 10000;
		this.estaAtacando = false;
		this.body.pushable=false;
		this.lastBasicAttack = 0;
		this.rate = 1200;
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
		this.body.setSize(this.width, this.height, true );
    
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.setFlipX(this.scene.witch.x > this.x ? false : true)
		
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
	updatePosition(){

	}
	die(){
		
	}
    dinamicLifebar(lb,lbs){
		lb.width = 170 * this.health/this.maxHealth;
		lb.x = this.x;
		lb.y = this.y + this.height/2 + 20;
		lbs.x = this.x;
		lbs.y = this.y + this.height/2 + 20;
		lb.setDepth(3);
	}
	generateEnemies(){

	}

}