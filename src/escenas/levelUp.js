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
		this.load.image('Shield', 'assets/GUI/shield.png');
		this.load.image('Life  Reg.', 'assets/GUI/healthRegen.png');
		this.load.image('Speed', 'assets/GUI/movementSpeed.png');
		this.load.image('Health', 'assets/GUI/health.png');
		this.load.image('Damage', 'assets/GUI/damage.png');
		this.load.image('Fire  Rate', 'assets/GUI/attackSpeed.png');
	}

	init (data) {
		this.abilityLevels = data.witch.abilityLevels;
	
	}

	create() {
		/* POOL DE HABILIDADES
			- VELOCIDAD DE ATAQUE
			- VELOCIDAD DE MOVIMIENTO
			- ESCUDO
			- VIDA
			- DAÑO
			- REGENERACIÓN DE VIDA
		*/

		var abilityPool = ["Speed", "Health", "Damage", "Shield", "Life  Reg.", "Fire  Rate"];
		let abilityMap = new Map([
			["Speed", "addSpeed"],
			["Health", "addHealth"],
			["Damage", "addDamage"],
			["Shield", "addShield"],
			["Life  Reg.", "addHealthRegen"],
			["Fire  Rate", "addRate"] 
		]);
		
		
		this.ability1 = this.getRandomAbility(abilityPool);
			while(this.abilityLevels.get(this.ability1)==5){
				this.ability1 = this.getRandomAbility(abilityPool);
			}
		this.ability2 = this.getRandomAbility(abilityPool);
			while(this.abilityLevels.get(this.ability2)==4){
				this.ability2 = this.getRandomAbility(abilityPool);
			}

		this.ability3 = this.getRandomAbility(abilityPool);
			while(this.abilityLevels.get(this.ability1)==5){
				this.ability1 = this.getRandomAbility(abilityPool);
			}
        var width = this.sys.game.canvas.width;
		this.r1 = this.add.image(125,180,'letter').setInteractive();
		this.r2 = this.add.image(325,180,'letter').setInteractive();
		this.r3 = this.add.image(525,180,'letter').setInteractive();
        
        this.text1 = this.add.text(125, 315, this.ability1 ,{fontFamily: 'titulo'});
        this.text1.setStroke(0x000000,2);
		this.text1.setScrollFactor(0);
        this.text1.setScale(2);
        this.text1.setResolution(10);
		this.text1.setOrigin(0.5, 0.5);
		this.add.image(125, 155, this.ability1);
		
        this.text2 = this.add.text(325, 315, this.ability2 ,{fontFamily: 'titulo'});
        this.text2.setStroke(0x000000,2);
		this.text2.setScrollFactor(0);
        this.text2.setScale(2);
        this.text2.setResolution(10);
		this.text2.setOrigin(0.5, 0.5);
		this.add.image(325, 155, this.ability2);
         
        this.text3 = this.add.text(525, 315, this.ability3 ,{fontFamily: 'titulo'});
        this.text3.setStroke(0x000000,2);
		this.text3.setScrollFactor(0);
        this.text3.setScale(2);
        this.text3.setResolution(10);
		this.text3.setOrigin(0.5, 0.5);
		this.add.image(525, 155, this.ability3);

        this.r1.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: abilityMap.get(this.ability1)})
		})

        this.r2.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: abilityMap.get(this.ability2)})
		})

        this.r3.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation',{skillSelected: abilityMap.get(this.ability3)})
		})

	}

	getRandomAbility(abilities) {
		return abilities[Math.round(Math.random()*(abilities.length-1))];
	}

}	