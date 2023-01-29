const config = {
    width: 1024,
    height: 1024,
    backgroundColor: '#000',
    type: Phaser.AUTO,
    parent: 'story-game',
    scene: [],
    scale: {
        zoom: 1.5,
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: { y: 0 },
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin.default,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}

new Phaser.Game(config);