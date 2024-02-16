class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    init() {
        this.VEL = 100  // slime velocity constant
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.image('tilesetImage', 'tileset.png')
        
    }

    create() {
        //tilemap
        const map = this.add.tilemap('tilemapJSON')
        //attatch image to data
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        //layers
        const bgLayer = map.createLayer('BG', tileset, 0, 0)

        const terrainLayer = mapt.createLayer('Terrain', tileset, 0, 0)
        terrainLayer.setCollisionByProperty({collides: true})

        const treesLayer = mapt.createLayer('Trees', tileset, 0, 0)
        terrainLayer.setCollisionByProperty({collides: true})
        
        // add slime
        this.slime = this.physics.add.sprite(slimeSpawn.x, slimeSpawn.y, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)

        // slime animation

        // input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // slime movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}