import { GAME_STATES, GROUND_POSITION } from './../../../game-engine/utilities/Config'
import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { ctx } from '../../../game-engine/utilities/Config'
import { gameCore } from '../../../game-engine/game-core/GameCore'
import { PLAYER_STATES } from '../../../game-engine/utilities/Config'
import { Physic } from '../../../game-engine/physics/Physic'
import { getScaleRatio } from '../../../game-engine/utilities/Utilities'

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
    scaleRatio: number
    state: number

    walkAnimationTimer: number

    physic: Physic

    constructor(scaleRatio: number, gameSpeed: number) {
        super()
        this.scaleRatio = getScaleRatio()

        //  this.width = 58 //* scaleRatio
        //  this.height = 62 //* scaleRatio
        this.image = standingStillImage
        this.width = this.image.width
        this.height = this.image.height
        this.state = PLAYER_STATES.RUNNING

        this.position = new Vec2D(
            10 * this.scaleRatio,
            this.canvas.height - this.height - 1.5 * scaleRatio
        )

        this.walkAnimationTimer = 200

        this.physic = new Physic(this, scaleRatio)
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        switch (this.state) {
            case PLAYER_STATES.RUNNING:
                if (
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
                ) {
                    this.state = PLAYER_STATES.JUMPING
                } else if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.image = duckImage
                    this.state = PLAYER_STATES.CROUCH
                }
                this.run(frameTimeDelta, gameSpeed)
                this.resetPos()
                break

            case PLAYER_STATES.JUMPING:
                this.image = standingStillEyeCloseImage

                if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.image = duckImage
                    this.physic.velocity.setY(
                        this.physic.velocity.getY() + (this.physic.gravity * frameTimeDelta) / 60
                    )
                    this.state = PLAYER_STATES.FALLING
                }
                this.physic.update(frameTimeDelta)
                if (this.physic.velocity.getY() >= 0) {
                    this.state = PLAYER_STATES.FALLING
                }
                break

            case PLAYER_STATES.FALLING:
                this.physic.update(frameTimeDelta)
                if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.image = duckImage
                    this.physic.velocity.setY(
                        this.physic.velocity.getY() + (this.physic.gravity * frameTimeDelta) / 60
                    )
                    this.state = PLAYER_STATES.FALLING
                }
                if (this.position.getY() >= this.physic.land) {
                    this.state = PLAYER_STATES.RUNNING
                    this.position.setY(this.physic.land)
                    this.physic.velocity.setY(10 * this.scaleRatio)
                    
                }
                break
            case PLAYER_STATES.CROUCH:
                if (!gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
                    this.state = PLAYER_STATES.RUNNING
                }
                
                this.duck(frameTimeDelta, gameSpeed)
                this.resetPos()
                break
        }
         
    }


    private resetPos() : void {
        this.width = this.image.width
        this.height = this.image.height
        this.position = new Vec2D(this.position.getX(), this.canvas.height - this.height - 1.5 * this.scaleRatio)
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

    run(frameTimeDelta: number, gameSpeed: number) {
        if (this.walkAnimationTimer <= 0) {
            if (this.image === dinoRun1_Image) {
                this.image = dinoRun2_Image
            } else {
                this.image = dinoRun1_Image
            }
            this.walkAnimationTimer = 200
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed
    }

    duck(frameTimeDelta: number, gameSpeed: number) {
        if (this.state === PLAYER_STATES.CROUCH) {
            if (this.walkAnimationTimer <= 0) {
                if (this.image === duckImage) {
                    this.image = duck2Image
                } else {
                    this.image = duckImage
                }
                this.walkAnimationTimer = 200
            }
            this.walkAnimationTimer -= frameTimeDelta * gameSpeed
        }
        return
    }
}
