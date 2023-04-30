import ExpBall from "../objetos/expBall.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, speed, health,damage) {
		super(scene, x, y);
		this.speed = speed;
		this.oldSpeed = speed;
		this.health = health;
		this.initialLife = health;
		this.damage = damage;
		this.diagonalSpeed = 49;
		this.respawnDistance = 360;
		this.isAlive = true;

		this.inactive();
		this.freezeAttackTime = 0;
		this.poisonAttackTime = 0;
		this.frozenCooldown = 4000;
		this.poisonCooldown = 8000;
		this.poisonAttackFinal = 0;
		this.poisonAttackIncrease = 2000;
		this.now = 0;
		this.poisonAttack = 0;

		this.scene.add.existing(this);
		this.onCollide = true;
		scene.physics.add.existing(this);
		
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.scene.physics.moveToObject(this,this.scene.witch, this.speed);  
		if(this.calcularDiagonal(this.x, this.y, this.scene.witch.x, this.scene.witch.y) > this.respawnDistance){
			this.updatePosition()
		}
		if( this.now == 1){
			this.freezeAttackTime = t;
			this.now = 0;
		}
		else if(t > this.freezeAttackTime + this.frozenCooldown) this.increaseSpeed();

		if( this.poisonAttack == 1){
			this.poisonAttackTime = t;
			this.poisonAttackFinal = t + this.poisonCooldown;
			this.poisonAttack = 0;
			console.log("poison time");
		}
		else {
			if(t == this.poisonAttackTime + this.poisonAttackIncrease && t < this.poisonAttackFinal ){
				this.receiveDamage(this.damage);
				this.poisonAttackTime = t;
				console.log("poison damage");
			}
			
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
   
	updatePosition(){
		let y1 = this.scene.generateRandomY();
		this.y = y1;
		this.x = this.scene.generateRandomX(y1);
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

	decreaseSpeed(){
		this.speed = 0;
		this.now = 1;
		
	}
	increaseSpeed(){
		this.speed = this.oldSpeed;
		
	}
    
	levelUp(){
			this.damage+=this.damageJump;
			this.initialLife+=this.initialLifeJump;
	}
	poison(){
		console.log("poison 2");
		this.poisonAttack = 1;
		this.receiveDamage();
	}

}