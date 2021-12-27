import Phaser from "phaser"

const createChestAnims = (anims) => {
    anims.create({
        key: 'chest-open',
        frames: anims.generateFrameNames('chest', {
            start: 0,
            end: 5,
            prefix: 'chest-',
            suffix: '.png'
        }),
        frameRate: 15
    })

    anims.create({
        key: 'chest-close',
        frames: anims.generateFrameNames('chest', {
            start: 5,
            end: 0,
            prefix: 'chest-',
            suffix: '.png'
        }),
        frameRate: 15
    })
}

export{
    createChestAnims
}
