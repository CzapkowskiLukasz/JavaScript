import Phaser from "phaser";

import {sceneEvents} from "../events/EventEmitter"

export default class GameUI extends Phaser.Scene {
    constructor() {
        super({ key: 'game-ui' })
    }
    create()
    {
        const examLabel = this.add.text(50,13, '0')
        
        sceneEvents.on('exams-passeds-changed', exams =>{
            examLabel.text = exams.toString()
        })

        const exams = this.add.group({
            classType: Phaser.GameObjects.Image
        })

        exams.createMultiple({
            key: 'exam-passed',
            setXY:{
                x: 20,
                y: 20,
            },
            quantity: 1
        })


        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () =>{
            sceneEvents.off('exams-passeds-changed')
        })
    }
}