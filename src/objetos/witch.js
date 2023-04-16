import WitchAttack from "./witchAttack.js";
import Wolf from "./wolf.js";
export default class Witch extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'witch');

		this.diagonalSpeed = 49;
		this.health = 500;
		this.experience = 0;
		this.speed = 70; //SPEED
		this.maxHealth = 500; //HEALTH
		this.damage = 20; //DAMAGE
		this.shield = 0; //SHIELD
		this.healthRegen = 0.05; //LIFE REG
		this.rate = 2000; //FIRE RATE
		// ------------------------------------------------
		this.speedJump = 30; // SPEED JUMP
		this.diagonalSpeedJump = 21;
		this.healthJump = 50; //HEALTH JUMP
		this.damageJump = 10; //DAMAGE JUMP
		this.shieldJump = 2; //SHIELD JUMP
		this.healthRegenJump = 0.02; // LIFE REG JUMP
		this.rateJump = 100; //FIRE RATE JUMP
		// ------------------------------------------------
		this.levelExp = [10,15,25,40,65,105,170,275,445,720,1165,
			1885,3050,4935,7985,12920,20905,33825,54730,88555,143285,
			231840,375125,606965,982090,1589055,2571145,4160200,6731345,
			10891545,17622890,28514435,46137325,74651760,120789085,195440845,
			316229930,511670775,827900705,1339571480,2167472185,3507043665,
			5674515850,9181559515,14856075365,24037634880,38893710245,
			62931345125,101825055370,164756400495,266581455865,43133785636010];
		this.level = 0;
		this.maxLevel = 15;
		this.lastBasicAttack = 0;
		
		
		this.maxAbilitiesLevels = 5;
		this.abilityLevels = new Map([
			["Speed", 0],
			["Health", 0],
			["Damage", 0],
			["Shield", 0],
			["Life  Reg.", 0],
			["Fire  Rate", 0] 
		]);
		
		this.onCollide = true;
		this.scene.add.existing(this);
		scene.physics.add.existing(this);

		this.scene.anims.create({
			key: 'idleWitch',
			frames: scene.anims.generateFrameNumbers('witch', {start:0, end:8}),
			frameRate: 12,
			repeat: -1
		});
		
		this.scene.anims.create({
			key: 'runWitch',
			frames: scene.anims.generateFrameNumbers('witch', {start:0, end:8}),
			frameRate: 12,
			repeat: -1
		});
		
		this.play('idleWitch');

		this.wKey = this.scene.input.keyboard.addKey('W'); 
		this.aKey = this.scene.input.keyboard.addKey('A'); 
		this.sKey = this.scene.input.keyboard.addKey('S'); 
		this.dKey = this.scene.input.keyboard.addKey('D');

		this.testingKey = this.scene.input.keyboard.addKey('P');

		//this.body.setCollideWorldBounds();

		// COLLIDER
		this.bodyOffsetWidth = this.body.width/2.5;
		this.bodyOffsetHeight = this.body.height/3;
		this.bodyWidth = this.body.width/5;
		this.bodyHeight = this.body.height/2;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;
	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		this.scene.healthText.setText([Math.round(this.health) + '/' + this.maxHealth]);
		
		if (t > this.lastBasicAttack + this.rate) {	
			var enemy = this.scene.physics.closest(this, this.scene.muchosLobos.children.entries);
			if (enemy instanceof Wolf && enemy.isAlive) new WitchAttack(this.scene, this.x, this.y, enemy, this.damage);
			this.lastBasicAttack = t;

			console.log(this.speed)
			console.log(this.health)
			console.log(this.damage)
			console.log(this.shield)
			console.log(this.healthRegen)
			console.log(this.rate)
			console.log("----------------------------")
			
		}
		if(this.scene.noname1){
			this.scene.noname1.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.scene.noname1.x, this.scene.noname1.y));
			this.scene.noname2.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.scene.noname2.x, this.scene.noname2.y));
		}
		
		this.scene.expbar.width = 366* this.experience/this.levelExp[this.level];
		this.scene.lifebar.width = 366 * this.health/this.maxHealth;
		
		if(this.health < this.maxHealth) this.health += this.healthRegen;
		// EXPERIENCIA
		if(this.experience >= this.levelExp[this.level] && this.level < this.maxLevel) {
			this.experience = 0;
			this.level++;
			this.scene.levelUp();
		}

		// TESTING BUTTON
		if(this.testingKey.isDown){
			this.speed = 600;
			this.diagonalSpeed = 424;
		}
		// MOVERSE A LA IZQUIERDA
		if(this.aKey.isDown){
			this.setFlipX(true)
			if (this.wKey.isDown || this.sKey.isDown) this.body.setVelocityX(-this.diagonalSpeed);
			else this.body.setVelocityX(-this.speed);
		}

		// MOVERSE A LA DERECHA
		if(this.dKey.isDown){
			this.setFlipX(false);
			if (this.wKey.isDown || this.sKey.isDown) this.body.setVelocityX(this.diagonalSpeed);
			else this.body.setVelocityX(this.speed);
		}

		// MOVERSE ARRIBA
		if(this.wKey.isDown){
			this.setFlipX(this.flipX)
			if (this.aKey.isDown || this.dKey.isDown) this.body.setVelocityY(-this.diagonalSpeed);
			else this.body.setVelocityY(-this.speed);
		}

		// MOVERSE ABAJO
		if(this.sKey.isDown){
			this.setFlipX(this.flipX)			
			if (this.aKey.isDown || this.dKey.isDown) this.body.setVelocityY(this.diagonalSpeed);
			else this.body.setVelocityY(this.speed);
		}
		
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey) || Phaser.Input.Keyboard.JustUp(this.wKey)|| Phaser.Input.Keyboard.JustUp(this.sKey)) this.body.setVelocity(0);
	
		this.scene.levelText.setText(['L e v e l: ' + this.level ]);
	}
	winExperience(exp){
		if(this.level < this.maxLevel || this.experience < this.levelExp[this.level]) this.experience += exp;
	}
	perderVida(){
		this.health -= 1;
		this.setTintFill(0xff0000);
		
		this.scene.time.addEvent({delay: 150, callback: function(){
			this.clearTint();
        }, callbackScope: this});
	}

	addRate(){
		this.rate -= this.rateJump;
		if(this.abilityLevels.get("Fire  Rate") < this.maxAbilitiesLevels) this.abilityLevels.set("Fire  Rate", this.abilityLevels.get("Fire  Rate") + 1); 
	}
	
	addHealth(){
		this.health += this.healthJump;
		this.maxHealth += this.healthJump;
		if(this.abilityLevels.get("Health") < this.maxAbilitiesLevels) this.abilityLevels.set("Health", this.abilityLevels.get("Health") + 1); 

	}
	
	addDamage(){
		this.damage += this.damageJump;
		if(this.abilityLevels.get("Damage") < this.maxAbilitiesLevels) this.abilityLevels.set("Damage", this.abilityLevels.get("Damage") + 1); 
	}

	addShield(){
		this.shield += this.shieldJump;
		if(this.abilityLevels.get("Shield") < this.maxAbilitiesLevels) this.abilityLevels.set("Shield", this.abilityLevels.get("Shield") + 1); 
	}
	
	addHealthRegen(){
		this.healthRegen += this.healthRegenJump;
		if(this.abilityLevels.get("Life  Reg.") < this.maxAbilitiesLevels) this.abilityLevels.set("Life  Reg.", this.abilityLevels.get("Life  Reg.") + 1);
	}
	
	addSpeed(){
		this.speed += this.speedJump;
		this.diagonalSpeed += this.diagonalSpeedJump;
		if(this.abilityLevels.get("Speed") < this.maxAbilitiesLevels) this.abilityLevels.set("Speed", this.abilityLevels.get("Speed") + 1);
	}
}