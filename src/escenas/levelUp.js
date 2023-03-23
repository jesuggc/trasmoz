/**
 * @extends Phaser.Scene
 */
export default class LevelUp extends Phaser.Scene {
	/**
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'levelUp' });
	}
	 
	preload(){
		
	}

	create() {
		/*
			POOL DE HABILIDADES
			- VELOCIDAD DE ATAQUE
			- VELOCIDAD DE MOVIMIENTO
			- ESCUDO
			- VIDA
			- DAÑO
			- REGENERACIÓN DE VIDA
		*/



        var width = this.sys.game.canvas.width;
		this.r1 = this.add.rectangle(125,180,160,320,0xffffff).setInteractive().setScrollFactor(0);
		this.r2 = this.add.rectangle(325,180,160,320,0xffffff).setInteractive().setScrollFactor(0);
		this.r3 = this.add.rectangle(525,180,160,320,0xffffff).setInteractive().setScrollFactor(0);
        
        this.text1 = this.add.text(80, 20, 'Speed',{fontFamily: 'titulo'});
        this.text1.setStroke(0x000000,2);
		this.text1.setScrollFactor(0);
        this.text1.setScale(2);
        this.text1.setResolution(10);

        this.text2 = this.add.text(280, 20, 'Health',{fontFamily: 'titulo'});
        this.text2.setStroke(0x000000,2);
		this.text2.setScrollFactor(0);
        this.text2.setScale(2);
        this.text2.setResolution(10);
         
        this.text3 = this.add.text(480, 20, 'Damage',{fontFamily: 'titulo'});
        this.text3.setStroke(0x000000,2);
		this.text3.setScrollFactor(0);
        this.text3.setScale(2);
        this.text3.setResolution(10);

        this.r1.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: "addSpeed"})
		})

        this.r2.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: "addHealth"})
		})

        this.r3.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: "addDamage"})
		})
	}
}