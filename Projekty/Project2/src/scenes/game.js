import Phaser from "phaser";

import { createHeroAnims } from "../anims/HeroAnims";

import { createChestAnims } from "../anims/chestAnims";

import Hero from "../characters/Hero"

import Enemy from "../characters/Enemy";

import Chest from "../assets/chest/chest";

import { createEnemyAnims } from "../anims/enemyAnims";

export default class Game extends Phaser.Scene {

    cursors

    hero

    enemyList = []

    constructor() {
        super('game')
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        this.scene.run('game-ui')

        const map = this.make.tilemap({
            key: 'parter'
        })
        const tileset = map.addTilesetImage('pb', 'tiles')

        map.createLayer('floor', tileset)
        const wallsLayer = map.createLayer('walls', tileset)

        const chests = this.physics.add.staticGroup({
            classType: Chest
        })
        const chest = map.getObjectLayer('chests')
        chest.objects.forEach(chestObj => {
            chests.get(chestObj.x + chestObj.width * 0.5, chestObj.y - chestObj.height, 'chest', 'chest-1.png')
        })
        const wallsdecor = map.createLayer('walls decor', tileset)
        const indoordecor = map.createLayer('indoor decor', tileset)
        wallsLayer.setCollisionByProperty({ colide: true })
        wallsdecor.setCollisionByProperty({ colide: true })
        indoordecor.setCollisionByProperty({ colide: true })

        // const debug = this.add.graphics().setAlpha(0.7) //<-- NIE USUWAC - DO DEBUGGOWANIA
        // wallsLayer.renderDebug(debug, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })
        // wallsdecor.renderDebug(debug, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })
        // indoordecor.renderDebug(debug, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })

        createHeroAnims(this.anims);
        createChestAnims(this.anims);
        createEnemyAnims(this.anims);
        this.hero = this.add.hero(this, 584, 136, 'hero')

        this.enemyList.push(this.add.enemy(this, 540, 160, 'enemy'))
        this.enemyList.push(this.add.enemy(this, 200, 232, 'enemy'))
        this.enemyList.push(this.add.enemy(this, 343, 392, 'enemy'))
        this.enemyList.push(this.add.enemy(this, 176, 512, 'enemy'))

        this.enemyList.forEach(element => {
            this.physics.add.collider(element, wallsLayer, this.handleEnemyWithMapCollision, undefined, this)
            this.physics.add.collider(element, wallsdecor)
            this.physics.add.collider(element, indoordecor)
            this.physics.add.collider(element, chests)
            this.physics.add.collider(element, this.hero, this.handleEnemyWithHeroCollision, undefined, this)
        });

        this.physics.add.collider(this.hero, wallsLayer)
        this.physics.add.collider(this.hero, wallsdecor)
        this.physics.add.collider(this.hero, indoordecor)
        this.physics.add.collider(this.hero, chests, this.handleChestCollision, undefined, this)

        this.cameras.main.startFollow(this.hero, true)
    }

    handleChestCollision(obj1, obj2) {
        if (this.hero) {
            this.hero.setChest(obj2)
        }
    }

    handleEnemyWithHeroCollision(obj1, obj2) {
        this.registry.destroy();
        this.events.off();
        this.scene.restart();
    }

    update() {
        if (this.hero) {
            this.hero.update(this.cursors)
        }
    }

}