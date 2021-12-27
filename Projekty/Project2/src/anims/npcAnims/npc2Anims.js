import Phaser from "phaser";

const createNpc2Anims = (anims) => {
    anims.create({
        key: 'npc2-idle-down',
        frames: [{ key: 'npc2', frame: 'npc2-move-down-1.png' }]
    })

    anims.create({
        key: 'npc2-idle-up',
        frames: [{ key: 'npc2', frame: 'npc2-move-up-1.png' }]
    })

    anims.create({
        key: 'npc2-idle-left',
        frames: [{ key: 'npc2', frame: 'npc2-move-left-1.png' }]
    })

    anims.create({
        key: 'npc2-idle-right',
        frames: [{ key: 'npc2', frame: 'npc2-move-right-1.png' }]
    })

    anims.create({
        key: 'npc2-move-down',
        frames: anims.generateFrameNames('npc2', { start: 0, end: 2, prefix: 'npc2-move-down-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'npc2-move-up',
        frames: anims.generateFrameNames('npc2', { start: 0, end: 2, prefix: 'npc2-move-up-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'npc2-move-left',
        frames: anims.generateFrameNames('npc2', { start: 0, end: 2, prefix: 'npc2-move-left-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'npc2-move-right',
        frames: anims.generateFrameNames('npc2', { start: 0, end: 2, prefix: 'npc2-move-right-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })
}

export {
    createNpc2Anims
}