import WitchAttack from "./witchAttack.js";
import FireAttack from "./fireAttack.js";
import LightningAttack from "./lightningAttack.js";
import Wolf from "./wolf.js";
import FireFlower from "./fireFlower.js";
import LightningFlower from "./lightningFlower.js";
import IceFlower from "./iceFlower.js";
import FreezeAttack from "./freezeAttack.js";
import PoisonFlower from "./poisonFlower.js";
import PoisonAttack from "./poisonAttack.js";
export default class Witch extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Scene} scene
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'witch');

		this.flowerArray = [false, false, false, false];

		this.healthRegen = 0.05;
		this.speed = 70;
		this.diagonalSpeed = 49;
		this.health = 500;
		this.damage = 20;
		this.maxHealth = 500;
		this.experience = 0;
		this.speedJump = 30;
		this.diagonalSpeedJump = 21;
		this.healthJump = 50;
		this.damageJump = 10;
		this.levelExp = [10,15,25,40,65,105,170,275,445,720,1165,
			1885,3050,4935,7985,12920,20905,33825,54730,88555,143285,
			231840,375125,606965,982090,1589055,2571145,4160200,6731345,
			10891545,17622890,28514435,46137325,74651760,120789085,195440845,
			316229930,511670775,827900705,1339571480,2167472185,3507043665,
			5674515850,9181559515,14856075365,24037634880,38893710245,
			62931345125,101825055370,164756400495,266581455865,43133785636010];
		this.level = 0;
		this.maxLevel = 15;

		this.basicAttackCooldown = 2000;
		this.lastBasicAttack = 0;
		this.lastFireAttack = 0;
		this.fireAttackCooldown = 4000;
		this.lastLightningAttack = 0;
		this.lightningAttackCooldown = 2000;
		this.lastFreezeAttack = 0;
		this.freezeAttackCooldown = 2000;
		this.lastPoisonAttack = 0;
		this.poisonAttackCooldown = 8000;

		this.shield =20;
		this.rate = 10;
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
		
		scene.physics.add.existing(this);

		//this.body.setCollideWorldBounds();

		// COLLIDER
		//this.bodyOffsetWidth = this.body.width/3;
		this.bodyOffsetWidth = this.body.width/2.5;
		this.bodyOffsetHeight = this.body.height/3;
		this.bodyWidth = this.body.width/5;
		this.bodyHeight = this.body.height/2;
		
		this.body.setOffset(this.bodyOffsetWidth, this.bodyOffsetHeight);
		this.body.width = this.bodyWidth;
		this.body.height = this.bodyHeight;

		this.fireAttack = new FireAttack(this.scene, this, this.x, this.y, this.damage);

	}

	preUpdate(t, dt) {
		super.preUpdate(t, dt);
		this.body.setVelocity(0);
		//if(this.anims.isPlaying === true) this.play('idleWitch');

		this.scene.healthText.setText([Math.round(this.health) + '/' + this.maxHealth]);
		
		// if (t > this.lastBasicAttack + this.basicAttackCooldown) {	
		// 	// console.log(this.scene.muchosLobos.children.entries);
		// 	var enemy = this.scene.physics.closest(this, this.scene.muchosLobos.children.entries);
		// 	//console.log(this.scene.physics.closest(this, this.scene.muchosLobos.children.entries));
		// 	if (enemy instanceof Wolf && enemy.isAlive) new WitchAttack(this.scene, this.x, this.y, enemy, this.damage);
		// 	this.lastBasicAttack = t;
		// }
		if (this.flowerArray[0]){
			if (t > this.lastFireAttack + this.fireAttackCooldown){
				// var wolf = this.scene.physics.closest(this, this.scene.muchosLobos.children.entries);				
				 this.fireAttack.setVisible(true);
				 this.fireAttack.body.enable = true;
				 
				// this.scene.add.existing(fireAttack);
				// this.scene.fireAttacks.add(fireAttack);
				// fireAttack.addCollider(this.scene.muchosLobos, this.fireAttack);
				this.scene.physics.add.overlap(this.fireAttack,this.scene.muchosLobos,(obj,obj2) => {
					console.log("quemo");
					obj2.receiveDamage(this.damage);
					
		
				});
				this.lastFireAttack = t;
			}
		}
		if (this.flowerArray[1]){
			if(t > this.lastLightningAttack + this.lightningAttackCooldown){

				var enemy = this.scene.physics.closest(this, this.scene.muchosLobos.children.entries);				

				this.lightningAttack = new LightningAttack(this.scene, enemy.x, enemy.y - 30, this.damage);
				// this.scene.physics.add.collider(this.lightningAttack,this.scene.muchosLobos,(obj,obj2) => {
				// 	console.log("rayo");
				// 	obj2.receiveDamage(obj2.health);
				// 	// obj.destroy();
		
				// });
				enemy.receiveDamage(this.damage);
				this.lastLightningAttack = t;
			}
		}
		// if (this.flowerArray[2]){
		// 	if(t > this.lastFreezeAttack + this.freezeAttackCooldown){
				
		// 		var enemy = this.scene.physics.closest(this, this.scene.muchosLobos.children.entries);
		// 		this.freezeAttack = new FreezeAttack(this.scene, this.x, this.y, enemy, this.damage);
				
				
		// 		this.lastFreezeAttack = t;
		// 	}
		// }
		if (this.flowerArray[3]){
			if(t > this.lastPoisonAttack + this.poisonAttackCooldown){
				
				var enemy = this.scene.physics.closest(this, this.scene.muchosLobos.children.entries);
				this.poisonAttack = new PoisonAttack(this.scene, this.x, this.y, enemy, this.damage);
				// this.scene.physics.add.collider(this.poisonAttack, this.objetive, (obj, obj2) =>{

				// });

				this.lastPoisonAttack = t;
			}
		}

		if(this.scene.noname1){
			this.radianAngle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.noname1.x, this.scene.noname1.y);
			this.radianAngle2 = Phaser.Math.Angle.Between(this.x, this.y, this.scene.noname2.x, this.scene.noname2.y);
			this.scene.noname1.setRotation(this.radianAngle);
			this.scene.noname2.setRotation(this.radianAngle2);
		}
		
		// console.log(this.scene.physics.closest(this));
		this.scene.expbar.width = 366* this.experience/this.levelExp[this.level];
		this.scene.lifebar.width = 366 * this.health/this.maxHealth;
		// console.log(this.scene.lifebarFill.width)
		if(this.health < this.maxHealth) this.health += this.healthRegen;
		// EXPERIENCIA
		if(this.experience >= this.levelExp[this.level] && this.level < this.maxLevel) {
			this.experience = 0;
			this.level++;
			this.scene.levelUp();
		}

		if (this.health <= 0) this.scene.lifebar.visible = false;
		// TESTING BUTTON
		if(this.testingKey.isDown){
			this.speed = 600;
			this.diagonalSpeed = 424;
		}
		// MOVERSE A LA IZQUIERDA
		if(this.aKey.isDown){
			this.setFlipX(true)
			//if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');
			
			if (this.wKey.isDown || this.sKey.isDown) this.body.setVelocityX(-this.diagonalSpeed);
			else this.body.setVelocityX(-this.speed);
		}

		// MOVERSE A LA DERECHA
		if(this.dKey.isDown){
			this.setFlipX(false);
			//if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');

			if (this.wKey.isDown || this.sKey.isDown) this.body.setVelocityX(this.diagonalSpeed);
			else this.body.setVelocityX(this.speed);
		}

		// MOVERSE ARRIBA
		if(this.wKey.isDown){
			this.setFlipX(this.flipX)
			//if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');
			
			if (this.aKey.isDown || this.dKey.isDown) this.body.setVelocityY(-this.diagonalSpeed);
			else this.body.setVelocityY(-this.speed);
		}

		// MOVERSE ABAJO
		if(this.sKey.isDown){
			this.setFlipX(this.flipX)
			//if(this.anims.currentAnim.key !== 'runWitch') this.play('runWitch');
			
			if (this.aKey.isDown || this.dKey.isDown) this.body.setVelocityY(this.diagonalSpeed);
			else this.body.setVelocityY(this.speed);
		}
		
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey) || Phaser.Input.Keyboard.JustUp(this.wKey)|| Phaser.Input.Keyboard.JustUp(this.sKey)){
			//if(this.anims.isPlaying === true) this.play('idleWitch');
			this.body.setVelocity(0);
		}
		this.scene.levelText.setText([
			'L e v e l: ' + this.level 
		]);
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
		this.rate += this.rateJump;
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

	guardarFlor(flor){

		if (flor instanceof FireFlower){
			this.flowerArray[0]=true;
		}
		if (flor instanceof LightningFlower){
			this.flowerArray[1]=true; 
		}
		if (flor instanceof IceFlower){
			this.flowerArray[2]=true;
		}
		if(flor instanceof PoisonFlower){
			this.flowerArray[3]=true;
		}

		for (let i = 0; i< 4; i++){
			console.log(this.flowerArray[i]);
		}

	}
}