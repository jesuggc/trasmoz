export default class Intro extends Phaser.Scene {


    constructor() {
        super({ key: 'intro' });
    }
    init(data){
        this.music = data.music;
    }

    create() {         
        this.screen = 0;
        this.Enter = this.input.keyboard.addKey('ENTER');
        this.text = this.add.text(0,80,'          La historia que verás a continuación ocurrió hace muchos años,\n          cuando la pequeña Alexia llegó a su aldea después de estar buscando\n          medicamentos para ayudar a su pueblo.\n\n          Las tropas del inquisidor Torquemada avanzaban destruyendo\n          todo a su paso, Trasmoz solo fue una aldea más llena de llamas\n          y desasosiego.\n\n          Cuando Alexia llegó y vió la destrucción decidió cobrar \n          venganza yendo a una cueva en las montañas que le permitiría\n          infiltrarse en el castillo y acabar con Torquemada.\n\n',{fontFamily: 'GeneralFont '}).setFontSize(20);        
        this.startButton = this.add.text(540, 340, 'Pulsa Enter',{fontFamily: 'GeneralFont '}).setFontSize(20);
        this.wasd = this.add.image(this.sys.game.canvas.width/4, this.sys.game.canvas.height/4, 'wasd').setScale(0.3).setVisible(false);
        this.flower = this.add.image(this.sys.game.canvas.width/4, this.sys.game.canvas.height/2, 'fireFlower').setScale(3).setVisible(false);
        this.exp = this.add.image(this.sys.game.canvas.width/4, this.sys.game.canvas.height/1.3, 'expBall').setScale(3).setVisible(false);
        this.control1 = this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/4,'Movimiento',{fontFamily: 'GeneralFont '}).setFontSize(30).setVisible(false);
        this.control2 = this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2.3,'Coge flores para\nadquirir nuevos ataques',{fontFamily: 'GeneralFont '}).setFontSize(30).setVisible(false);
        this.control3 = this.add.text(this.sys.game.canvas.width/2, this.sys.game.canvas.height/1.5,'Coge experiencia para\nadquirir habilidades',{fontFamily: 'GeneralFont '}).setFontSize(30).setVisible(false);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.Enter)){
            if (this.screen === 0){
                this.text.setVisible(false);
                this.wasd.setVisible(true);
                this.flower.setVisible(true);
                this.exp.setVisible(true);
                this.control1.setVisible(true);
                this.control2.setVisible(true);
                this.control3.setVisible(true);
                this.screen++;
            }
            else this.startGame();
        }
    }

    startGame(){
        this.scene.start('animation');
        this.music.stop();
    }

}