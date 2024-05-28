import { ctx } from '../../../game-engine/utilities/Config'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Enemy } from './Enemy'

const birdImage1 = new Image()
birdImage1.src = './assets/images/bird_1.png'

const birdImage2 = new Image()
birdImage2.src = './assets/images/bird_2.png'

export class Bird extends Enemy {
    private flyAnimationTimer: number
    private scaleRatio: number
    private speed: number

    constructor(scaleRatio: number, speed: number, position: Vec2D, depth: number) {
        super(scaleRatio)

        this.width = 50 //* scaleRatio
        this.height = 50 //* scaleRatio
        this.position = position

        this.scaleRatio = scaleRatio
        this.speed = speed
        this.depth = depth

        this.image = birdImage1
        this.flyAnimationTimer = 100
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.fly(gameSpeed, frameTimeDelta)
        super.update(frameTimeDelta, gameSpeed)
    }

    fly(frameTimeDelta: number, gameSpeed: number) {
        if (this.flyAnimationTimer <= 0) {
            if (this.image === birdImage1) {
                this.image = birdImage2
            } else {
                this.image = birdImage1
            }
            this.flyAnimationTimer = 300
        }
        this.flyAnimationTimer -= frameTimeDelta * gameSpeed
    }
}
