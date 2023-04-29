export default class Intro extends Phaser.Scene {


    constructor() {
        super({ key: 'intro' });
    }
    init(data){
        this.music = data.music;
    }

    create() {
        const config = {
            mute: false,
            volume: 0.15,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
			//pauseOnBlur : false,
            delay: 0,
          }; 
          
          
        this.Enter = this.input.keyboard.addKey('ENTER');
        this.startButton = this.add.text(0,80,'          La historia que verás a continuación ocurrió hace muchos años,\n          cuando la pequeña Alexia llegó a su aldea después de estar buscando\n          medicamentos para ayudar a su pueblo.\n\n          Las tropas del inquisidor Torquemada avanzaban destruyendo\n          todo a su paso, Trasmoz solo fue una aldea más llena de llamas\n          y desasosiego.\n\n          Cuando Alexia llegó y vió la destrucción decidió cobrar \n          venganza yendo a una cueva en las montañas que le permitiría\n          infiltrarse en el castillo y acabar con Torquemada.\n\n',{fontFamily: 'GeneralFont '}).setFontSize(20);        
        this.text = this.add.text(540, 340, 'Pulsa Enter',{fontFamily: 'GeneralFont '}).setFontSize(20);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.Enter)){
            this.startGame();
        }
    }

    startGame(){
        this.scene.start('animation');
        this.music.stop();
    }

}