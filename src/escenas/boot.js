export default class Boot extends Phaser.Scene {
	constructor() {
		super({ key: 'boot' });
	}

	preload() {
		this.load.tilemapTiledJSON('tilemap',	    'levels/MapaPrueba.json'); 
        this.load.tilemapTiledJSON('castleTilemap', 'levels/castillo.json'); 

		this.load.spritesheet('witch', 			'assets/witch/bruja.png', 					{ frameWidth: 66, frameHeight: 66 })
		this.load.spritesheet('witchAttack', 	'assets/witch/FireBall.png', 				{ frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('wolf', 			'assets/enemies/wolf/wolfWalk.png', 		{ frameWidth: 64.8, frameHeight: 33 })
		this.load.spritesheet('knight', 		'assets/enemies/knight/knightWalk.png', 	{ frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('knightAttack', 	'assets/enemies/knight/knightAttack.png',	{ frameWidth: 74, frameHeight: 73 })
		this.load.spritesheet('fireAttack', 	'assets/witch/fireAttack.png',				{frameWidth: 96, frameHeight: 96})
		this.load.spritesheet('lightningAttack','assets/witch/lightningAttack.png', 		{frameWidth: 64, frameHeight: 64})
		this.load.spritesheet('freezeAttack', 	'assets/witch/freezeAttack.png', 			{frameWidth: 128, frameHeight: 128 })
		this.load.spritesheet('poisonAttack', 	'assets/witch/poisonAttack.png', 			{frameWidth: 64, frameHeight: 64 })
        
		this.load.image('patronGround', 	'levels/ground.png'); 
		this.load.image('patronTrees', 		'levels/trees.png'); 
		this.load.image('patronHouse', 		'levels/witchHouse.png');
		this.load.image('patronCliff',		'levels/cliff.png');
		this.load.image('patronRocks',		'levels/rocks.png'); 
		this.load.image('patronGraves', 	'levels/graves.png');
		this.load.image('patronDecoration',	'levels/decoration.png'); 
		this.load.image('patronWater', 		'levels/water.png'); 
		this.load.image('patronSquare', 	'levels/square.png'); 
		this.load.image('patronBridge', 	'levels/bridge.png'); 
		this.load.image('fireFlower', 		'assets/flowers/fireFlower.png')
		this.load.image('lightningFlower', 	'assets/flowers/lightningFlower.png')
		this.load.image('iceFlower', 		'assets/flowers/iceFlower.png')
		this.load.image('poisonFlower', 	'assets/flowers/poisonFlower.png')
		this.load.image('expBall',			'assets/witch/expBall.png')
		this.load.image('pause_button', 	'assets/GUI/pause_button.png')
		this.load.image('pause_button1', 	'assets/GUI/buttons/pause_button1.png')
		this.load.image('noname', 			'assets/noname/noName1.png');
		this.load.image('noname2', 			'assets/noname/noName2.png');
		this.load.image('patronCastle',     'levels/Castle.png'); 
        this.load.image('gameoverImage',    'assets/GUI/defeatMsg.png');
        this.load.image('winImage', 'assets/GUI/victoryMsg.png');
        this.load.image('letter',           'assets/GUI/abilities/abilitiesBG.png');
		this.load.image('Shield',           'assets/GUI/abilities/shield.png');
		this.load.image('Life  Reg.',       'assets/GUI/abilities/healthRegen.png');
		this.load.image('Speed',            'assets/GUI/abilities/movementSpeed.png');
		this.load.image('Health',           'assets/GUI/abilities/health.png');
		this.load.image('Damage',           'assets/GUI/abilities/damage.png');
		this.load.image('Fire  Rate',       'assets/GUI/abilities/attackSpeed.png');
        this.load.image('continue', 'assets/GUI/buttons/resetButton1.png');
		this.load.image('continue2', 'assets/GUI/buttons/resetButton2.png');
        this.load.image('pause_background', 'assets/GUI/pause_background.jpg')
        this.load.image('witchPause', 'assets/witch/bruja_pause.png')
        this.load.image('speed', 'assets/GUI/abilities/speed.png')
		this.load.image('witchBg', 'assets/GUI/woodPannel.png');
        this.load.image('play',             'assets/GUI/buttons/playButton1.png');
		this.load.image('play2',            'assets/GUI/buttons/playButton2.png');
		this.load.image('credits',          'assets/GUI/buttons/creditsButton1.png');
		this.load.image('credits2',         'assets/GUI/buttons/creditsButton2.png');
		this.load.image('options',          'assets/GUI/buttons/optionsButton1.png');
		this.load.image('options2',         'assets/GUI/buttons/optionsButton2.png');
		this.load.image('sound',            'assets/GUI/buttons/soundButton1.png');
		this.load.image('sound2', 'assets/GUI/buttons/soundButton2.png');
		this.load.image('fullscreen', 'assets/GUI/buttons/fullscreenButton1.png');
		this.load.image('fullscreen2', 'assets/GUI/buttons/fullscreenButton2.png');
		this.load.image('title_background', 'assets/title_background.jpg');

		this.load.audio('titleSoundtrack', 'assets/soundtrack/title_soundtrack.wav');

	}
	create() {
        this.scene.start('title');
    }
}
		