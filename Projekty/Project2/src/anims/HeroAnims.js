import Phaser from "phaser";

const createHeroAnims = (anims) => {
    anims.create({
        key: 'hero-idle-down',
        frames: [{ key: 'hero', frame: 'move-down-2.png' }]
    })

    anims.create({
        key: 'hero-idle-up',
        frames: [{ key: 'hero', frame: 'move-up-2.png' }]
    })

    anims.create({
        key: 'hero-idle-left',
        frames: [{ key: 'hero', frame: 'move-left-2.png' }]
    })

    anims.create({
        key: 'hero-idle-right',
        frames: [{ key: 'hero', frame: 'move-right-2.png' }]
    })

    anims.create({
        key: 'hero-move-down',
        frames: anims.generateFrameNames('hero', { start: 1, end: 3, prefix: 'move-down-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'hero-move-up',
        frames: anims.generateFrameNames('hero', { start: 1, end: 3, prefix: 'move-up-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'hero-move-left',
        frames: anims.generateFrameNames('hero', { start: 1, end: 3, prefix: 'move-left-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'hero-move-right',
        frames: anims.generateFrameNames('hero', { start: 1, end: 3, prefix: 'move-right-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })
}

export {
    createHeroAnims
}