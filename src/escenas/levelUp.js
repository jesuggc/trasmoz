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
		this.load.image('letter', 'assets/GUI/abilitiesBG.png');
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

		var abilityPool = ["addSpeed", "addHealth", "addDamage", "addShield", "addHealthRegen", "addRate"];
		
		this.ability1 = this.getRandomAbility(abilityPool);
		this.ability2 = this.getRandomAbility(abilityPool);
		this.ability3 = this.getRandomAbility(abilityPool);

        var width = this.sys.game.canvas.width;
		this.r1 = this.add.image(125,180,'letter').setInteractive();
		this.r2 = this.add.image(325,180,'letter').setInteractive();
		this.r3 = this.add.image(525,180,'letter').setInteractive();
        
        this.text1 = this.add.text(70, 305, this.ability1 ,{fontFamily: 'titulo'});
        this.text1.setStroke(0x000000,2);
		this.text1.setScrollFactor(0);
        this.text1.setScale(2);
        this.text1.setResolution(10);

        this.text2 = this.add.text(270, 305, this.ability2 ,{fontFamily: 'titulo'});
        this.text2.setStroke(0x000000,2);
		this.text2.setScrollFactor(0);
        this.text2.setScale(2);
        this.text2.setResolution(10);
         
        this.text3 = this.add.text(470, 305, this.ability3 ,{fontFamily: 'titulo'});
        this.text3.setStroke(0x000000,2);
		this.text3.setScrollFactor(0);
        this.text3.setScale(2);
        this.text3.setResolution(10);

        this.r1.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: this.ability1})
		})

        this.r2.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: this.ability2})
		})

        this.r3.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: this.ability3})
		})

	}

	getRandomAbility(abilities){
		return abilities[Math.round(Math.random()*(abilities.length-1))];
	}

}