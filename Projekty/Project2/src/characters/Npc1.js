import Phaser from "phaser"

import { sceneEvents } from "../events/EventEmitter"

const UP = 0
const Down = 1
const Right = 2
const Left = 3
const speed = 80

export default class Npc1 extends Phaser.Physics.Arcade.Sprite {

    timerEvent
    direction = 0
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        this.anims.play('npc1-move-right')

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleEnemyWithMapCollision, this)
        scene.physics.world.on(Phaser.Physics.Arcade.Events.COLLIDE, this.handleEnemyWithMapCollision, this)

        this.timerEvent = scene.time.addEvent({
            delay: 100, callback: () => {
                this.setDirection()
            }, callbackScope: this, loop: true
        });
    }

    destroy(scene) {
        this.timerEvent.destroy()

        super.destroy(scene)
    }


    handleEnemyWithMapCollision(obj1, obj2) {

        if (obj1 !== this) {
            return
        }
        this.setDirection()
    }

    setDirection() {
        while (Phaser.Math.Between(0, 3) == this.direction) {
            this.direction = Phaser.Math.Between(0, 3)
        }
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)

        switch (this.direction) {
            case 0:
                this.setVelocity(0, -speed)
                this.anims.play('npc1-move-up', true)
                break
            case 1:
                this.setVelocity(0, speed)
                this.anims.play('npc1-move-down', true)
                break
            case 2:
                this.setVelocity(speed, 0)
                this.anims.play('npc1-move-right', true)
                break
            case 3:
                this.setVelocity(-speed, 0)
                this.anims.play('npc1-move-left', true)
                break
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('npc1', function (scene, x, y, texture, frame) {
    var sprite = new Npc1(scene, x, y, texture, frame)

    sprite.setDirection()

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    sprite.body.setSize(sprite.width * 0.25, sprite.height * 0.35)
    sprite.body.offset.x = 13
    sprite.body.offset.y = 19
    sprite.body.onCollide = true
    return sprite
})