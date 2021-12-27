import Phaser from "phaser";


export default class Preloader extends Phaser.Scene {
    constructor() {
        super('prealoader')
    }

    preload() {
        this.load.baseURL = 'http://127.0.0.1:5500/src/assets/';
        this.load.crossOrigin = 'anonymous';

        this.load.image('exam-passed', '/ui/exam-passed.png')


        this.load.image('tiles', 'tiles/atlas_16x.png')
        this.load.tilemapTiledJSON('parter', '/maps/parter.json')
        this.load.tilemapTiledJSON('piwnica', '/maps/piwnica.json')

        this.load.atlas('hero', 'character/mainCharacter.png', 'character/mainCharacter.json')
        this.load.atlas('npc1', 'character/npc1.png', 'character/npc1.json')
        this.load.atlas('npc2', 'character/npc2.png', 'character/npc2.json')
        this.load.atlas('chest', 'chest/chest.png', 'chest/chest.json')
        this.load.image('upStairs', 'objects/upStairs.png')
        this.load.image('beer', 'objects/beer.png')
        this.load.atlas('enemy', 'character/enemy.png', 'character/enemy.json')
    }

    create() {
        this.scene.start('GroundFloor', 1)
    }
}