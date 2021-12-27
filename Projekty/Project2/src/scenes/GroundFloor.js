import Phaser from "phaser";

import { createHeroAnims } from "../anims/HeroAnims";

import Hero from "../characters/Hero";
import BaseScene from "./BaseScene";

export default class GroundFloor extends BaseScene {

    constructor() {
        super('GroundFloor')
    }

    create() {
        super.create('parter')
    }

    update() {
        // if (this.spaceKey.isDown) {
        //     this.switchScene('Basement', 0, 0)
        // } else {
        //     super.update()
        // }

        super.update()
    }

    configurePositions() {
        this.positions = [
            { x: 608, y: 160 },
            { x: 288, y: 96 },
            { x: 272, y: 96 }
        ]
    }
}