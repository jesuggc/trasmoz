import ExpBall from "../objetos/expBall.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
     * 
	 */
	constructor(scene, x, y, speed, health,damage) {
		super(scene, x, y);
		this.speed = speed;
		this.health = health;
		this.initialLife = health;
		this.damage = damage;
		this.diagonalSpeed = 49;
		this.respawnDistance = 360;
		this.witch = this.scene.witch;
		this.isAlive = true;
		
		this.scene.add.existing(this);
		this.onCollide = true;
		scene.physics.add.existing(this);
		
	}

	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}
	calcularDiagonal(x1,y1,x2,y2){
		return Math.sqrt(Math.pow(x1 - x2,2)+Math.pow(y1 - y2,2));
	}

   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.scene.physics.moveToObject(this,this.scene.witch, 50);  
        if(this.calcularDiagonal(this.x, this.y, this.witch.x, this.witch.y) > this.respawnDistance){
			let y1 = this.scene.generateRandomY();
			this.y = y1;
			this.x = this.scene.generateRandomX(y1);
        }
       
		if (this.health <= 0) this.die();
	}
	die(){
		this.isAlive = false;
		new ExpBall(this.scene,this.x,this.y);
		this.setVisible(false);
		this.setActive(false);
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
		this.witch.perderVida(this.damage)
	}
    

}