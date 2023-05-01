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
		this.now = 0;
		this.hasBeenDamaged = false;

		this.poisonTicks = 0;
		this.poisonDamage = 5;

		this.scene.add.existing(this);
		this.onCollide = true;
		scene.physics.add.existing(this);
		
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.scene.physics.moveToObject(this,this.scene.witch, this.speed);  
		if(this.calcularDiagonal(this.x, this.y, this.scene.witch.x, this.scene.witch.y) > this.respawnDistance) this.updatePosition()
		if( this.now == 1){
			this.freezeAttackTime = t;
			this.now = 0;
		}
		else if(t > this.freezeAttackTime + this.frozenCooldown) this.increaseSpeed();

		if (this.poisonTicks === 0) this.clearTint();
		else if(this.poisonTicks > 0 && t > this.poisonAttackTime + 700){
			this.receiveDamage(this.poisonDamage, '0x49f21b');
			this.poisonTicks--;
			this.poisonAttackTime = t;
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
		this.poisonTicks = 0;
		this.inactive();
		this.isAlive = false;
		this.respawn();
	}
   
	updatePosition(){
		let y1 = this.scene.generateRandomY();
		this.y = y1;
		this.x = this.scene.generateRandomX(y1);
		this.increaseSpeed()
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
	receiveDamage(damage,col){
		this.health -= damage;
		this.tinkle();
		this.printDamage(damage,col);
	}

	printDamage(damage,col){
		let damageText = this.scene.add.text(this.x-20, this.y-20, damage, { fontFamily: 'titulo' });
		damageText.setResolution(10);
		damageText.setStroke(0x000000,2);
		if (col) damageText.setTint(col)
		else (damageText.setTint(0xffffff))
		this.scene.tweens.add({
		  targets: damageText,
		  y: damageText.y - 20, 
		  alpha: 0,
		  duration: 1000,
		  ease: 'Linear',
		  onComplete: function() {
			damageText.destroy();
		  }
		});
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
		this.anims.pause();
		this.now = 1;
	}
	
	increaseSpeed(){
		this.speed = this.oldSpeed;
		this.anims.resume();
	}
    
	levelUp(){
			this.damage+=this.damageJump;
			this.initialLife+=this.initialLifeJump;
	}
	poison(){
		this.poisonTicks = 8;
	}

}