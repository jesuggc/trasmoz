export default class ExpBall extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y);
		
		
		this.wolf = this.scene.wolf //Guardamos referencia a la bruja
		this.setScale(0.25);
		this.scene.add.existing(this); //Anadimos el disparo a la escena
        this.setScale(0.5);
        
		this.scene.anims.create({
			key: 'idleexpBall',
			frames: scene.anims.generateFrameNumbers('expBall', {start:0, end:0}),
			frameRate: 1,
			repeat: -1
		});
		
		// La animacion a ejecutar segun se genere el personaje sera 'idle'
		this.play('idleexpBall');
		
		
		// Agregamos la bruja a las fisicas para que Phaser lo tenga en cuenta
		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
		this.scene.physics.add.collider(this, this.scene.witch, this.getExp, null, this);

		// Ajustamos el "collider" de nuestro ataque
		this.body.setOffset(this.body.width * 31, this.body.height / 2);
        this.body.setSize(this.body.width* 1.6, this.body.height*1.6);
        
        // this.bodyOffsetWidth = this.body.width/4;
		// this.bodyOffsetHeight = this.body.height/6+20;
		// this.bodyWidth = this.body.width/1.7;
		// this.bodyHeight = this.body.height/2;
		
		// this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		// this.body.width = this.bodyWidth;
		// this.body.height = this.bodyHeight;
		
	}
   
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutara la animacion
		super.preUpdate(t, dt);
	}
    
	getExp(){
        this.scene.witch.winExperience();
        this.destroy();
	}

	

}