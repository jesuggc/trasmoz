
export default class Knight extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'knight');
		this.speed = 50; 
		this.initialLife = 40;
		this.health = this.initialLife;
		this.diagonalSpeed = 49;
		this.respawnDistance = 360;
		this.witch = this.scene.witch;
		this.setScale(0.8); 
		this.isAlive = true;

		this.scene.add.existing(this);

        this.scene.anims.create({
			key: 'walkKnight',
			frames: scene.anims.generateFrameNumbers('knight', {start:0, end:10}),
			frameRate: 7,
			repeat: -1
		});

        this.scene.anims.create({
			key: 'attackKnight',
			frames: scene.anims.generateFrameNumbers('knightAttack', {start:0, end:10}),
			frameRate: 7,
			repeat: -1
		});
		this.play('walkKnight');
		this.onCollide = true;

		
		scene.physics.add.existing(this);
        
		//this.body.setCollideWorldBounds();

		// COLLIDER
		this.bodyOffsetWidth = this.body.width/2;
		this.bodyOffsetHeight = this.body.height/3;
		this.bodyWidth = this.body.width/3;
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
        if (this.witch.x > this.x) this.setFlipX(true);
        else this.setFlipX(false);
		if (this.health <= 0) this.die();
	}
    
	die(){
		this.isAlive = false;
		//new ExpBall(this.scene,this.x,this.y);
		this.setVisible(false);
		this.setActive(false);
		this.respawn();
	}
    
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
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
    attack(){
        this.witch.perderVida();
    }
	receiveDamage(damage){
		this.health -= damage;
		this.setVisible(false);
		this.setTintFill(0xffffff);
		this.scene.time.addEvent({delay: 90, callback: function(){
			this.setVisible(true);
			this.clearTint();
        }, callbackScope: this});
		this.damageText = this.scene.add.text(this.x-20, this.y-20, damage, { fontFamily: 'titulo' });
		this.damageText.setResolution(10);
		this.damageText.setStroke(0x000000,2);
		
		this.scene.time.addEvent({delay: 450, callback: function(){
			this.damageText.destroy();
        }, callbackScope: this});
	}

}