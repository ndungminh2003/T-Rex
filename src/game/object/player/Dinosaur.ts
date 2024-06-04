import { DinosaurState } from './state/DinosaurState'
import { Collider } from './../../../game-engine/physics/Collider'
import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Physic } from '../../../game-engine/physics/Physic'
import { Animation } from '../../../game-engine/animation/Animation'
import { RunState } from './state/RunState'
import { CourchState } from './state/CourchState'

const standingStillImage = new Image()
standingStillImage.src = './assets/images/standing_still.png'

const dinoRun1_Image = new Image()
dinoRun1_Image.src = './assets/images/dino_run1.png'

const dinoRun2_Image = new Image()
dinoRun2_Image.src = './assets/images/dino_run2.png'

const duckImage = new Image()
duckImage.src = './assets/images/crouch_1.png'

const duck2Image = new Image()
duck2Image.src = './assets/images/crouch_2.png'

export class Dinosaur extends Sprite {
    protected physic: Physic
    protected animation: Animation
    protected collider: Collider
    protected currentState: DinosaurState

    constructor() {
        super()

        this.currentState = new RunState(this)

        this.image = standingStillImage
        this.width = 88 //this.image.width
        this.height = 94 //this.image.height

        this.position = new Vec2D(10, this.canvas.height - this.height)
        this.physic = new Physic(this)
        this.animation = new Animation(this, this)

        this.animation.addAnimationFrame('RUNNING', dinoRun1_Image)
        this.animation.addAnimationFrame('RUNNING', dinoRun2_Image)

        this.animation.addAnimationFrame('CROUCH', duckImage)
        this.animation.addAnimationFrame('CROUCH', duck2Image)

        this.collider = new Collider(this)
    }

    // state machine
    public update(frameTimeDelta: number, gameSpeed: number): void {
        if (
            this.position.getX() <= 40 &&
            (this.currentState instanceof RunState || this.currentState instanceof CourchState)
        ) {
            if (this.currentState instanceof RunState) {
                this.animation.play('RUNNING', frameTimeDelta, 0.7)
            } else {
                this.animation.play('CROUCH', frameTimeDelta, 0.7)
            }

            this.position.setX(this.position.getX() + 1)
        }

        this.currentState.update(frameTimeDelta, gameSpeed)
    }

    public getPhysic(): Physic {
        return this.physic
    }

    public getAnimation(): Animation {
        return this.animation
    }

    public setImage(image: HTMLImageElement): void {
        this.image = image
    }

    public changeState(state: DinosaurState) {
        this.currentState = state
    }

    public resetPos(): void {
        this.width = this.image.width
        this.height = this.image.height
        this.position = new Vec2D(this.position.getX(), this.canvas.height - this.height)
    }
}
