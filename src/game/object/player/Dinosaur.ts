import { Collider } from './../../../game-engine/physics/Collider'
import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { ctx } from '../../../game-engine/utilities/Config'
import { gameCore } from '../../../game-engine/game-core/GameCore'
import { PLAYER_STATES } from '../../../game-engine/utilities/Config'
import { Physic } from '../../../game-engine/physics/Physic'
import { Animation } from '../../../game-engine/animation/Animation'

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
    state: string
    physic: Physic
    animation: Animation
    collider: Collider

    constructor() {
        super()

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

    update(frameTimeDelta: number, gameSpeed: number) {
        switch (this.state) {
            case PLAYER_STATES.RUNNING:
                if (
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
                ) {
                    this.image = standingStillEyeCloseImage
                    this.state = PLAYER_STATES.JUMPING
                } else if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.image = duckImage
                    this.state = PLAYER_STATES.CROUCH
                    this.resetPos()
                }
                this.animation.play('RUNNING', frameTimeDelta, gameSpeed)
                this.resetPos()
                break

            case PLAYER_STATES.JUMPING:
                if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.physic.velocity.setY(
                        this.physic.velocity.getY() + (this.physic.gravity * frameTimeDelta) / 60
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
                        this.physic.velocity.getY() + (this.physic.gravity * frameTimeDelta) / 60
                    )
                    this.state = PLAYER_STATES.FALLING
                }
                if (this.position.getY() >= this.physic.land) {
                    this.image = dinoRun1_Image
                    this.state = PLAYER_STATES.RUNNING
                    this.position.setY(this.physic.land)
                    this.physic.velocity.setY(10)
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
    }

    private resetPos(): void {
        this.width = this.image.width
        this.height = this.image.height
        this.position = new Vec2D(this.position.getX(), this.canvas.height - this.height)
    }

    render() {
        ctx.drawImage(
            this.image,
            this.position.getX(),
            this.position.getY(),
            this.width,
            this.height
        )
    }

    // duck(frameTimeDelta: number, gameSpeed: number) {
    //     if (this.state === PLAYER_STATES.CROUCH) {
    //         if (this.walkAnimationTimer <= 0) {
    //             if (this.image === duckImage) {
    //                 this.image = duck2Image
    //             } else {
    //                 this.image = duckImage
    //             }
    //             this.walkAnimationTimer = 200
    //         }
    //         this.walkAnimationTimer -= frameTimeDelta * gameSpeed
    //     }
    //     return
    // }
}
