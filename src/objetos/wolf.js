import ExpBall from "../objetos/expBall.js";

export default class Wolf extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'wolf');
		this.speed = 70; 
		this.health = 40;
		this.diagonalSpeed = 49;
		this.respawnDistance = 360;
		this.witch = this.scene.witch;
		this.setScale(0.5);
		this.isAlive = true;

		this.scene.add.existing(this);

        this.scene.anims.create({
			key: 'idleWolf',
			frames: scene.anims.generateFrameNumbers('wolf', {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});

		this.play('idleWolf');
		this.onCollide = true;

		
		scene.physics.add.existing(this);
        
		//this.body.setCollideWorldBounds();

		// COLLIDER
		this.bodyOffsetWidth = this.body.width/4;
		this.bodyOffsetHeight = this.body.height/6+20;
		this.bodyWidth = this.body.width/1.7;
		this.bodyHeight = this.body.height/2;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;
    
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
        if (this.witch.x < this.x) this.setFlipX(true);
        else this.setFlipX(false);
		if (this.health <= 0) this.die();
	}
    
	die(){
		this.isAlive = false;
		new ExpBall(this.scene,this.x,this.y);
		this.destroy();
	}
    
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

	receiveDamage(damage){
		this.health -= damage;
		this.setVisible(false);
		//this.setTintFill(0xffffff);
		this.scene.time.addEvent({delay: 90, callback: function(){
			this.setVisible(true);
			//this.clearTint();
        }, callbackScope: this});
		this.damageText = this.scene.add.text(this.x-20, this.y-20, damage, { fontFamily: 'titulo' });
		this.damageText.setResolution(100);
		this.damageText.setStroke(0x000000,2);
		this.scene.time.addEvent({delay: 450, callback: function(){
			this.damageText.destroy();
        }, callbackScope: this});
	}

}