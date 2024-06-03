import { Animation } from './../../../game-engine/animation/Animation'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Enemy } from './Enemy'
import { IFlyAbleEnemy } from '../../../types/IFlyAbleEnemy'

const birdImage1 = new Image()
birdImage1.src = './assets/images/bird_1.png'

const birdImage2 = new Image()
birdImage2.src = './assets/images/bird_2.png'

export class Bird extends Enemy implements IFlyAbleEnemy {
    private animation: Animation

    constructor(position: Vec2D, depth: number) {
        super()
        this.position = position
        this.depth = depth
        this.image = birdImage1

        this.width = birdImage1.width
        this.height = birdImage1.height

        this.animation = new Animation(this, this)
        this.animation.addAnimationFrame('FLY', birdImage1)
        this.animation.addAnimationFrame('FLY', birdImage2)
    }

    public update(frameTimeDelta: number, gameSpeed: number) {
        this.fly(frameTimeDelta, gameSpeed)
        super.update(frameTimeDelta, gameSpeed)
    }

    public fly(frameTimeDelta: number, gameSpeed: number){
        this.animation.play('FLY', frameTimeDelta, gameSpeed)
    }
    
}
