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
		this.diagonalSpeed = 49 //calculado por pitagoras
		this.respawnDistance = 200;
		this.setScale(0.5);

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
        
		// Decimos que el caballero colisiona con los limites del mundo
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

	/* Bucle principal del personaje, actualizamos su posicion y ejecutamos acciones segun el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */

   
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutara la animacion
		super.preUpdate(t, dt);
        this.scene.physics.moveToObject(this,this.scene.witch, 50);    
        if(this.calcularDiagonal(this.x, this.y, this.scene.witch.x, this.scene.witch.y) > this.respawnDistance){
            this.x = this.scene.witch.x + Math.random()*100;
            this.y = this.scene.witch.y + Math.random()*100;
        }
        
        if(this.scene.witch.x < this.x) {
            this.setFlipX(true)
        }
        else{
            this.setFlipX(false);
        }
	}
    
    
	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}

}