import Phaser from "phaser";

const createEnemyAnims = (anims) => {

    anims.create({
        key: 'enemy-idle-down',
        frames: [{ key: 'enemy', frame: 'enemy-move-down-2.png' }]
    })

    anims.create({
        key: 'enemy-move-down',
        frames: anims.generateFrameNames('enemy', { start: 0, end: 2, prefix: 'enemy-move-down-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'enemy-move-up',
        frames: anims.generateFrameNames('enemy', { start: 0, end: 2, prefix: 'enemy-move-up-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'enemy-move-left',
        frames: anims.generateFrameNames('enemy', { start: 0, end: 2, prefix: 'enemy-move-left-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'enemy-move-right',
        frames: anims.generateFrameNames('enemy', { start: 0, end: 2, prefix: 'enemy-move-right-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })
}

export {
    createEnemyAnims
}