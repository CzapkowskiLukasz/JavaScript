import Phaser from "phaser"

import {sceneEvents} from "../events/EventEmitter"

export default class Hero extends Phaser.Physics.Arcade.Sprite {

    bodyOffsetX = 13;

    activatedChest = []
    collectedBottles = []
    activeChest
    collectedBottle
    exams = 0
    speed = 100

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.anims.play('hero-idle-down')
    }

    setChest(chest) {
        this.activeChest = chest
    }

    setBottle(bottle){
        this.collectedBottle = bottle
    }

    getExams(){
        return this.exams
    }

    lowerExams(){
        this.exams -= 1
        sceneEvents.emit('exams-passeds-changed', this.exams)
    }

    update(cursors) {

        if (!cursors) {
            return
        }

        const leftDown = cursors.left.isDown
        const rightDown = cursors.right.isDown
        const upDown = cursors.up.isDown
        const downDown = cursors.down.isDown
        const openChest = cursors.space.isDown

        if (openChest) {
            if (this.activeChest) {
                if (this.activatedChest.includes(this.activeChest) == false) {
                    this.activatedChest.push(this.activeChest)
                    const exams = this.activeChest.open()
                    this.exams += exams
                    sceneEvents.emit('exams-passeds-changed', this.exams)
                }
            }
            if(this.collectedBottle){
                if(this.collectedBottles.includes(this.collectedBottle) == false){
                    this.collectedBottles.push(this.collectedBottle)
                    this.speed += 10
                    console.log(this.speed)
                }
            }
            return
        }

        if (leftDown) {
            this.anims.play('hero-move-left', true)
            this.setVelocity(-this.speed, 0)

            this.body.offset.x = this.bodyOffsetX
        } else if (rightDown) {
            this.anims.play('hero-move-right', true)
            this.setVelocity(this.speed, 0)

            this.body.offset.x = this.bodyOffsetX
        } else if (upDown) {
            this.anims.play('hero-move-up', true)
            this.setVelocity(0, -this.speed)
        } else if (downDown) {
            this.anims.play('hero-move-down', true)
            this.setVelocity(0, this.speed)
        } else {
            const parts = this.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.anims.play(parts.join('-'))
            this.setVelocity(0, 0)
        }

        if (leftDown || rightDown || upDown || downDown) {
            this.activeChest = undefined
            this.collectedBootle = undefined
        }
    }
}


Phaser.GameObjects.GameObjectFactory.register('hero', function (scene, x, y, texture, frame) {
    var sprite = new Hero(scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    sprite.body.setSize(sprite.width * 0.25, sprite.height * 0.35)
    sprite.body.offset.x = 13
    sprite.body.offset.y = 19

    return sprite
})