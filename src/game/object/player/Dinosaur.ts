// import { DinosaurManager } from './DinosaurManager'
import { Collider } from './../../../game-engine/physics/Collider'
import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { PLAYER_STATES } from '../../../game-engine/utilities/Config'
import { Physic } from '../../../game-engine/physics/Physic'
import { Animation } from '../../../game-engine/animation/Animation'
import { gameCore } from '../../../game-engine/game-core/GameCore'

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

const standingStillEyeCloseImage = new Image()
standingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

export class Dinosaur extends Sprite {
    protected state: string

    protected physic: Physic
    protected animation: Animation
    protected collider: Collider
    // protected dinosaurManager: DinosaurManager

    constructor() {
        super()
        // this.dinosaurManager = dinosaurManager

        this.image = standingStillImage
        this.width = this.image.width
        this.height = this.image.height

        this.state = PLAYER_STATES.RUNNING

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
        switch (this.state) {
            case PLAYER_STATES.RUNNING:
                this.animation.play('RUNNING', frameTimeDelta, gameSpeed)
                if (
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
                ) {
                    this.image = standingStillEyeCloseImage
                    this.state = PLAYER_STATES.JUMPING
                    this.physic.velocity.setY(-1.2)
                } else if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.image = duckImage
                    this.state = PLAYER_STATES.CROUCH
                    this.resetPos()
                }
                this.resetPos()
                break
            case PLAYER_STATES.JUMPING:
                if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.physic.velocity.setY(
                        this.physic.velocity.getY() + this.physic.gravity * frameTimeDelta * 2
                    )
                    this.state = PLAYER_STATES.FALLING
                }
                if (
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN) &&
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE)
                ) {
                    this.image = duckImage
                    this.resetPos()
                    this.state = PLAYER_STATES.CROUCH
                }
                this.physic.update(frameTimeDelta)
                if (this.physic.velocity.getY() >= 0) {
                    this.state = PLAYER_STATES.FALLING
                }
                break
            case PLAYER_STATES.FALLING:
                this.physic.update(frameTimeDelta)
                if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.physic.velocity.setY(
                        this.physic.velocity.getY() + this.physic.gravity * frameTimeDelta * 2
                    )
                    this.state = PLAYER_STATES.FALLING
                }
                if (this.position.getY() >= this.physic.land) {
                    this.image = dinoRun1_Image
                    this.state = PLAYER_STATES.RUNNING
                }
                break
            case PLAYER_STATES.CROUCH:
                if (!gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.image = standingStillImage
                    this.state = PLAYER_STATES.RUNNING
                    this.resetPos()
                }
                this.animation.play('CROUCH', frameTimeDelta, gameSpeed)
                this.resetPos()
                break
        }
        return
    }

    public getPhysic(): Physic {
        return this.physic
    }

    protected resetPos(): void {
        this.width = this.image.width
        this.height = this.image.height
        this.position = new Vec2D(this.position.getX(), this.canvas.height - this.height)
    }
}
