import BaseScene from "./BaseScene"

export default class Basement extends BaseScene {

    moreDecor

    constructor() {
        super('Basement')
    }

    create() {
        super.create('piwnica')
    }

    update() {
        // if (this.spaceKey.isDown) {
        //     this.switchScene('GroundFloor', 0, 0)
        // } else {
        //     super.update()
        // }
        super.update()
    }

    configurePositions() {
        this.positions = [
            { x: 1024, y: 256 },
            { x: 672, y: 192 }
        ]
    }

    configureLayers() {
        super.configureLayers();
        this.moreDecor = this.map.createLayer('more decor', this.tileset)
        this.moreDecor.setCollisionByProperty({ colide: true })
    }

    configureHero(position) {
        super.configureHero(position)
        this.physics.add.collider(this.hero, this.moreDecor)
    }
}