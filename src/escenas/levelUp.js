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
		this.load.image('letter', 'assets/GUI/abilities/abilitiesBG.png');
		this.load.image('Shield', 'assets/GUI/abilities/shield.png');
		this.load.image('Life  Reg.', 'assets/GUI/abilities/healthRegen.png');
		this.load.image('Speed', 'assets/GUI/abilities/movementSpeed.png');
		this.load.image('Health', 'assets/GUI/abilities/health.png');
		this.load.image('Damage', 'assets/GUI/abilities/damage.png');
		this.load.image('Fire  Rate', 'assets/GUI/abilities/attackSpeed.png');
	}

	init (data) {
		this.abilityLevels = data.witch.abilityLevels;
		this.backScene = data.backScene;
	}

	create() {
		var abilityPool = ["Speed", "Health", "Damage", "Shield", "Life  Reg.", "Fire  Rate"];
		this.abilityMap = new Map([
			["Speed", "addSpeed"],
			["Health", "addHealth"],
			["Damage", "addDamage"],
			["Shield", "addShield"],
			["Life  Reg.", "addHealthRegen"],
			["Fire  Rate", "addRate"] 
		]);
		
		this.ability1 = this.getRandomAbility(abilityPool);
		while(this.abilityLevels.get(this.ability1)==4){
			this.ability1 = this.getRandomAbility(abilityPool);
		}
		this.ability2 = this.getRandomAbility(abilityPool);
		while(this.abilityLevels.get(this.ability2)==4){
			this.ability2 = this.getRandomAbility(abilityPool);
		}

		this.ability3 = this.getRandomAbility(abilityPool);
		while(this.abilityLevels.get(this.ability3)==4){
			this.ability3 = this.getRandomAbility(abilityPool);
		}

		this.r1 = this.add.image(125,180,'letter').setInteractive();
		this.r2 = this.add.image(325,180,'letter').setInteractive();
		this.r3 = this.add.image(525,180,'letter').setInteractive();
        
        this.text1 = this.add.text(125, 315, this.ability1 ,{fontFamily: 'titulo'});
        this.createText(this.text1)
		this.add.image(125, 155, this.ability1);
		
        this.text2 = this.add.text(325, 315, this.ability2 ,{fontFamily: 'titulo'});
        this.createText(this.text2)
		this.add.image(325, 155, this.ability2);
         
        this.text3 = this.add.text(525, 315, this.ability3 ,{fontFamily: 'titulo'});
        this.createText(this.text3)
		this.add.image(525, 155, this.ability3);

        this.r1.on('pointerup', pointer => {
			this.changeScene(this.ability1)
		})

        this.r2.on('pointerup', pointer => {
			this.changeScene(this.ability2)
		})

        this.r3.on('pointerup', pointer => {
			this.changeScene(this.ability3)
		})

	}

	createText(textLab){
		textLab.setStroke(0x000000,2);
		textLab.setScrollFactor(0);
        textLab.setScale(2);
        textLab.setResolution(10);
		textLab.setOrigin(0.5, 0.5);
	}

	changeScene(ab) {
		this.scene.pause();
        this.scene.setVisible(false);
		this.scene.resume(this.backScene,{skillSelected: this.abilityMap.get(ab)})
	}

	getRandomAbility(abilities) {
		return abilities[Math.round(Math.random()*(abilities.length-1))];
	}

}	