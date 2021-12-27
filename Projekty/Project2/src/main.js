import Phaser from "phaser";

import Preloader from "./scenes/preloader"
import GroundFloor from "./scenes/GroundFloor";
import Basement from "./scenes/Basement";
import Game from "./scenes/game";
import GameUI from "./scenes/gameUI";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 400,
    height: 250,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: [Preloader, GroundFloor, Basement, GameUI],
    scale: {
        zoom: 2.5,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
})

// var game = new Phaser.Game(config);

// var ball;

// function preload() {
//     this.load.baseURL = 'http://127.0.0.1:5500/src/assets/';
//     this.load.crossOrigin = 'anonymous';


//     this.load.image('sky', 'sky.png');
// }

// function create() {
//     this.add.image(400, 300, 'sky');
// }

// function update() { }