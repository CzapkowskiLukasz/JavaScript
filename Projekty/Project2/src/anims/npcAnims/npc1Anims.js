import Phaser from "phaser";

const createNpc1Anims = (anims) => {
    anims.create({
        key: 'npc1-idle-down',
        frames: [{ key: 'npc1', frame: 'npc-move-down-1.png' }]
    })

    anims.create({
        key: 'npc1-idle-up',
        frames: [{ key: 'npc1', frame: 'npc-move-up-1.png' }]
    })

    anims.create({
        key: 'npc1-idle-left',
        frames: [{ key: 'npc1', frame: 'npc-move-left-1.png' }]
    })

    anims.create({
        key: 'npc1-idle-right',
        frames: [{ key: 'npc1', frame: 'npc-move-right-1.png' }]
    })

    anims.create({
        key: 'npc1-move-down',
        frames: anims.generateFrameNames('npc1', { start: 0, end: 2, prefix: 'npc-move-down-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'npc1-move-up',
        frames: anims.generateFrameNames('npc1', { start: 0, end: 2, prefix: 'npc-move-up-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'npc1-move-left',
        frames: anims.generateFrameNames('npc1', { start: 0, end: 2, prefix: 'npc-move-left-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'npc1-move-right',
        frames: anims.generateFrameNames('npc1', { start: 0, end: 2, prefix: 'npc-move-right-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })
}

export {
    createNpc1Anims
}