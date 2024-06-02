import { Animation } from './../../../game-engine/animation/Animation'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Enemy } from './Enemy'

const birdImage1 = new Image()
birdImage1.src = './assets/images/bird_1.png'

const birdImage2 = new Image()
birdImage2.src = './assets/images/bird_2.png'

export class Bird extends Enemy {
    private animation: Animation

    constructor(position: Vec2D, depth: number) {
        super()

        this.position = position

        this.width = birdImage1.width
        this.height = birdImage1.height

        this.depth = depth

        this.image = birdImage1

        this.animation = new Animation(this, this)
        this.animation.addAnimationFrame('FLY', birdImage1)
        this.animation.addAnimationFrame('FLY', birdImage2)
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.fly(gameSpeed, frameTimeDelta)
        super.update(frameTimeDelta, gameSpeed)
    }

    fly(frameTimeDelta: number, gameSpeed: number) {
        this.animation.play('FLY', frameTimeDelta, gameSpeed)
    }
}
