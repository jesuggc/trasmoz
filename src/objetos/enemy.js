import ExpBall from "../objetos/expBall.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
	
	constructor(scene, speed, health,damage) {
		super(scene, 0, 0);
		this.speed = speed;
		this.health = health;
		this.initialLife = health;
		this.damage = damage;
		this.diagonalSpeed = 49;
		this.respawnDistance = 360;
		this.isAlive = true;

		this.inactive();

		this.scene.add.existing(this);
		this.onCollide = true;
		scene.physics.add.existing(this);
		
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.scene.physics.moveToObject(this,this.scene.witch, this.speed);  
		if(this.calcularDiagonal(this.x, this.y, this.scene.witch.x, this.scene.witch.y) > this.respawnDistance){
			let y1 = this.scene.generateRandomY();
			this.y = y1;
			this.x = this.scene.generateRandomX(y1);
		}
		
		if (this.health <= 0) this.die();
	}
	
	calcularDiagonal(x1,y1,x2,y2){
		return Math.sqrt(Math.pow(x1 - x2,2)+Math.pow(y1 - y2,2));
	}   

	inactive(){
		this.setVisible(false);
		this.setActive(false);
	}

	die(){
		new ExpBall(this.scene,this.x,this.y,'expBall');
		this.inactive();
		this.isAlive = false;
		this.respawn();
	}
   

	respawn(){
		var y = this.scene.generateRandomY();
		this.y = y;
		this.x = this.scene.generateRandomX(y);
		this.setVisible(true);
		this.setActive(true);
		this.isAlive = true;
		this.health = this.initialLife;
	}
	receiveDamage(damage){
		this.health -= damage;
		this.tinkle();
		this.printDamage(damage);
	}

	printDamage(damage){
		this.damageText = this.scene.add.text(this.x-20, this.y-20, damage, { fontFamily: 'titulo' });
		this.damageText.setResolution(10);
		this.damageText.setStroke(0x000000,2);
		this.scene.time.addEvent({delay: 450, callback: function(){
			this.damageText.destroy();
        }, callbackScope: this});
	}

	tinkle(){
		this.setVisible(false);
		this.scene.time.addEvent({delay: 90, callback: function(){
			this.setVisible(true);
        }, callbackScope: this});
	}

	attack(){
		this.scene.witch.perderVida(this.damage)
	}
    
	levelUp(){
			this.damage+=this.damageJump;
			this.initialLife+=this.initialLifeJump;
	}

}