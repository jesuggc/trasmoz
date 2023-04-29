export default class Credits extends Phaser.Scene {

	constructor() {
		super({ key: 'credits' });
	}

	create() {
		this.cameras.main.setBackgroundColor('#000000')
		const text = "Desarrollado por: Clara, Fran, Elena\n y Jesus" +
		" Proyecto universitario de\n Videojuegos Web - Universidad \nComplutense de Madrid" +
		" Musica por:\n Pepe" +
		" Graficos por: Manolo \n" +
		" Agradecimientos especiales a \n nuestros profesores por su apoyo\n y orientación." +
		" ¡Gracias por jugar!\r";

		this.r1 = this.add.rectangle(326,180,600,320,0xffffff).setInteractive().setScrollFactor(0);
        
        this.text1 = this.add.text(50, 20, text ,{fontFamily: 'titulo'}).setStroke(0x000000,2).setScrollFactor(0).setScale(2).setResolution(20);

        this.r1.on('pointerup', pointer => {
			this.scene.pause();
            this.scene.setVisible(false);
			this.scene.resume('animation')
		})

        
	}
}