export default class Wolf extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Bruja, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'wolf');
		this.speed = 70; // Nuestra velocidad de movimiento sera 140
		this.health = 40;
		this.diagonalSpeed = 49 //calculado por pitagoras
		this.respawnDistance = 360;
		this.witch = this.scene.witch; //Guardamos referencia a la bruja
		this.setScale(0.5);
		this.isAlive = true;

		this.scene.add.existing(this); //Anadimos el caballero a la escena

        this.scene.anims.create({
			key: 'idleWolf',
			frames: scene.anims.generateFrameNumbers('wolf', {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});

		// La animacion a ejecutar segun se genere el personaje sera 'idle'
		this.play('idleWolf');


		// Agregamos la bruja a las fisicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);
        
		//this.body.setCollideWorldBounds();

		// Ajustamos el "collider" de nuestro caballero
		this.bodyOffsetWidth = this.body.width/4;
		this.bodyOffsetHeight = this.body.height/6+20;
		this.bodyWidth = this.body.width/1.7;
		this.bodyHeight = this.body.height/2;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;
    
        this.calcularDiagonal = function(x1,y1,x2,y2){
            return Math.sqrt(Math.pow(x1 - x2,2)+Math.pow(y1 - y2,2));
        }
	}



   
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.scene.physics.moveToObject(this,this.scene.witch, 50);    
        if(this.calcularDiagonal(this.x, this.y, this.witch.x, this.witch.y) > this.respawnDistance){
			let y1 = this.scene.generateRandomY();
			this.y = y1;
			this.x = this.scene.generateRandomX(y1);
        }
        if (this.witch.x < this.x) this.setFlipX(true)
        else this.setFlipX(false);
		console.log(this.health);
		if (this.health <= 0) this.die();
	}
    
	die(){
		this.isAlive = false;
		this.scene.wolf.destroy();
	}
    
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

	receiveDamage(damage){
		this.health -= damage;
	}

}