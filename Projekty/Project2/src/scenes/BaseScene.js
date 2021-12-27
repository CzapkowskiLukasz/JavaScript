import Phaser from "phaser";

import { createHeroAnims } from "../anims/HeroAnims";

import { createChestAnims } from "../anims/chestAnims";

import { createEnemyAnims } from "../anims/enemyAnims";

import { createNpc1Anims } from "../anims/npcAnims/npc1Anims";
import { createNpc2Anims } from "../anims/npcAnims/npc2Anims";

import Hero from "../characters/Hero";

import Npc1 from "../characters/Npc1"

import Npc2 from "../characters/Npc2"

import Chest from "../assets/chest/chest";

export default class BaseScene extends Phaser.Scene {

    cursors
    spaceKey
    map
    tileset
    positions
    positionIndex

    wallsLayer
    wallsdecor
    indoordecor

    chestGroup
    stairsGroup
    hero
    enemyList = []

    npcList = []

    spawnHeroEventKey = 'spawn-hero'

    constructor(config) {
        super(config)
    }

    init(positionIndex) {
        this.positionIndex = positionIndex - 1
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
        // this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    create(tileMapKey) {
        this.scene.run('game-ui')

        this.configurePositions();
        this.configureMap(tileMapKey)
        this.configureLayers()
        this.configureStairs()
        this.configureChests()
        this.configureHero(this.position)
        this.configureEnemies()
        this.configureNpc()


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
    }

    configurePositions() {
        this.positions = []
    }

    configureMap(tileMapKey) {
        this.map = this.make.tilemap({
            key: tileMapKey
        })
        this.tileset = this.map.addTilesetImage('pb', 'tiles')
        this.map.createLayer('floor', this.tileset)
    }

    configureLayers() {

        this.wallsLayer = this.map.createLayer('walls', this.tileset)
        this.configureBottles()
        this.wallsdecor = this.map.createLayer('walls decor', this.tileset)
        this.indoordecor = this.map.createLayer('indoor decor', this.tileset)

        this.wallsLayer.setCollisionByProperty({ colide: true })
        this.wallsdecor.setCollisionByProperty({ colide: true })
        this.indoordecor.setCollisionByProperty({ colide: true })
    }

    configureChests() {
        createChestAnims(this.anims);
        this.chestGroup = this.physics.add.staticGroup({
            classType: Chest
        })
        const chestLayer = this.map.getObjectLayer('chests')
        chestLayer.objects.forEach(chestObj => {
            this.chestGroup.get(chestObj.x + chestObj.width * 0.5, chestObj.y - chestObj.height, 'chest', 'chest-1.png')
        })
    }

    configureStairs() {
        this.stairsGroup = this.physics.add.staticGroup({
            classType: Phaser.GameObjects.Image
        })
        const stairsLayer = this.map.getObjectLayer('upStairs')
        stairsLayer.objects.forEach(stairObj => {
            this.stairsGroup.get(stairObj.x + stairObj.width * 0.5, stairObj.y - stairObj.height, 'upStairs')
        })
    }

    configureBottles() {
        this.bottlesGroup = this.physics.add.staticGroup({
            classType: Phaser.GameObjects.Image
        })
        const bottlesLayer = this.map.getObjectLayer('bottles')
        bottlesLayer.objects.forEach(bottleObj => {
            this.bottlesGroup.get(bottleObj.x + bottleObj.width * 0.5, bottleObj.y - bottleObj.height * 0.5, 'beer')
        })
    }

    configureHero() {
        createHeroAnims(this.anims)

        const position = this.positions[this.positionIndex];
        this.hero = this.add.hero(this, position.x, position.y, 'hero')

        this.physics.add.collider(this.hero, this.wallsLayer)
        this.physics.add.collider(this.hero, this.wallsdecor)
        this.physics.add.collider(this.hero, this.indoordecor)
        this.physics.add.collider(this.hero, this.chestGroup, this.handleChestCollision, undefined, this)
        this.physics.add.collider(this.hero, this.stairsGroup, this.handleStairsCollision, undefined, this)
        this.physics.add.collider(this.hero, this.bottlesGroup, this.handleBottlesColission, undefined, this)

        this.cameras.main.startFollow(this.hero, true)
    }

    configureEnemies() {
        createEnemyAnims(this.anims);

        this.enemyList.push(this.add.enemy(this, 540, 160, 'enemy'))
        this.enemyList.push(this.add.enemy(this, 200, 232, 'enemy'))
        this.enemyList.push(this.add.enemy(this, 343, 392, 'enemy'))
        this.enemyList.push(this.add.enemy(this, 176, 512, 'enemy'))

        this.enemyList.forEach(element => {
            this.physics.add.collider(element, this.wallsLayer)
            this.physics.add.collider(element, this.wallsdecor)
            this.physics.add.collider(element, this.indoordecor)
            this.physics.add.collider(element, this.chestGroup)
            this.physics.add.collider(element, this.hero, this.handleEnemyWithHeroCollision, undefined, this)
        });
    }

    configureNpc() {
        createNpc1Anims(this.anims)
        createNpc2Anims(this.anims)


        this.npcList.push(this.add.npc1(this, 500, 160, 'npc1'))
        this.npcList.push(this.add.npc2(this, 176, 512, 'npc2'))
        this.npcList.push(this.add.npc2(this, 194, 538, 'npc2'))
        this.npcList.push(this.add.npc1(this, 160, 512, 'npc1'))

        this.npcList.forEach(element => {
            this.physics.add.collider(element, this.wallsLayer)
            this.physics.add.collider(element, this.wallsdecor)
            this.physics.add.collider(element, this.indoordecor)
            this.physics.add.collider(element, this.chestGroup)
            this.physics.add.collider(element, this.hero, this.handleNpcWithHeroCollision, undefined, this)
        });
    }

    handleNpcWithHeroCollision(obj1, obj2) {
        if (this.hero.exams > 0) {
            this.hero.lowerExams()
        }

        else {
            this.resetGame()
        }
    }


    handleChestCollision(obj1, obj2) {
        if (this.hero) {
            this.hero.setChest(obj2)
        }
    }

    handleBottlesColission(obj1, obj2) {
        if (this.hero) {
            this.hero.setBottle(obj2)
        }
    }

    handleStairsCollision(obj1, obj2) {
        const index = this.stairsGroup.children.entries.indexOf(obj2)
        this.switchScene('Basement', index)
    }

    handleEnemyWithHeroCollision(obj1, obj2) {
        this.resetGame()
    }

    resetGame() {
        this.registry.destroy();
        this.events.off();
        this.scene.restart();
    }

    update() {
        if (this.hero) {
            this.hero.update(this.cursors)
        }
    }

    switchScene(sceneName, stairsIndex) {
        this.scene.start(sceneName, stairsIndex)
    }
}