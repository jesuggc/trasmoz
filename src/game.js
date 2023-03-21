import Animation from './escenas/animation.js';
import Title from './escenas/title.js'
import Pause from './escenas/pause.js'
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuracion del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    // type: Phaser.CANVAS,
    // canvas: document.getElementById("juego"),
    width:  656,
    height: 376,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamano de pantalla donde ejecutadmos
		// con un minimo y un maximo de tamano
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 900,
            height: 750
        },
		zoom: 1
    },
    scene: [/*Title,*/ Animation, Pause],
    physics: { 
        default: 'arcade', 
        arcade: { 
            debug: true 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: "Prueba de concepto",
    version: "1.0.0",
    transparent: false
};

new Phaser.Game(config);