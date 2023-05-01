import Animation from './escenas/animation.js';
import Title from './escenas/title.js'
import Pause from './escenas/pause.js'
import LevelUp from './escenas/levelUp.js';
import Castle from './escenas/castle.js'
import Credits from './escenas/credits.js';
import Gameover from './escenas/gameover.js';
import Intro from './escenas/intro.js';
import Win from './escenas/win.js';
import Boot from './escenas/boot.js';

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
        // mode: Phaser.Scale.ScaleModes.FIT 
        mode: Phaser.Scale.FIT,
        min: {
            width: 328,
            height: 188
        },
        max: {
            width:  900,
            height: 600,
        },
        zoom: 1
    },
    scene: [
        Boot,
        Title,
        Intro,
        Animation,
        Castle,
        Gameover,
        Win,
        Pause,
        Credits,
        LevelUp,
    ],
    physics: { 
        default: 'arcade', 
        arcade: { 
            debug: false 
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