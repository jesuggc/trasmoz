import ExpBall from "../objetos/expBall.js";

export default class Enemy extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene
	 * @param {number} x
	 * @param {number} y
     * 
	 */
	constructor(scene, x, y) {
		super(scene, x, y);
		this.speed = 70;
		this.diagonalSpeed = 49;
		this.respawnDistance = 360;

		this.scene.add.existing(this);
		this.onCollide = true;
		scene.physics.add.existing(this);
	}

	resetCollider(){
		this.body.width = this.bodyWidth;
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
	}
	preupdate(){}
	calcularDiagonal(x1,y1,x2,y2){}
	die(){}
	respawn(){}
	receiveDamage(damage){}
    attack(){}  
    

}