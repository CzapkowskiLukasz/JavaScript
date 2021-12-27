import Phaser from "phaser";

export default class Chest extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.play('chest-close')
    }
    open() {
        this.play('chest-open')
        this.play('chest-close')
        return Phaser.Math.Between(1, 3)
    }
}