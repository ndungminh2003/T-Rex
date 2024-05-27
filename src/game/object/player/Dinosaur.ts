import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { ctx } from '../../../game-engine/utilities/Config'
import { gameCore } from '../../../game-engine/game-core/GameCore'
import { PLAYER_STATES } from '../../../game-engine/utilities/Config'
import { Physic } from '../../../game-engine/physics/Physic'

const standingStillImage = new Image()
standingStillImage.src = './assets/images/standing_still.png'

const dinoRun1_Image = new Image()
dinoRun1_Image.src = './assets/images/dino_run1.png'

const dinoRun2_Image = new Image()
dinoRun2_Image.src = './assets/images/dino_run2.png'

const duckImage = new Image()
duckImage.src = './assets/images/duck.png'

const duck2Image = new Image()
duck2Image.src = './assets/images/duck_2.png'

const stadingStillEyeCloseImage = new Image()
stadingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

export class Dinosaur extends Sprite {
    scaleRatio: number
    state: number

    yStandingPosition: number
    isDuck: boolean
    jumpPressed: boolean

    gravity: number
    velocity: Vec2D
    walkAnimationTimer: number

    constructor(scaleRatio: number, gameSpeed: number) {
        super()
        this.scaleRatio = scaleRatio

        this.width = 58 //* scaleRatio
        this.height = 62 //* scaleRatio
        this.state = PLAYER_STATES.RUNNING

        this.position = new Vec2D(
            10 * this.scaleRatio,
            this.canvas.height - this.height - 1.5 * scaleRatio
        )

        this.yStandingPosition = this.canvas.height - this.height - 1.5 * scaleRatio

        this.image = standingStillImage

        this.walkAnimationTimer = 200

        this.jumpPressed = false
        this.isDuck = false

        this.gravity = 20 * this.scaleRatio
        this.velocity = new Vec2D(0, -this.gravity)

        this.addComponent(new Physic(this, this.scaleRatio))
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        if (
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
        ) {
            this.state = PLAYER_STATES.JUMPING
            this.jumpPressed = true
        }

        switch (this.state) {
            case PLAYER_STATES.RUNNING: {
                this.run(gameSpeed, frameTimeDelta)
                break
            }
            case PLAYER_STATES.JUMPING: {
                this.jump(frameTimeDelta)
                break
            }
            case PLAYER_STATES.COUCH: {
                this.duck(gameSpeed, frameTimeDelta)
            }
        }
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
        if (!this.isDuck) {
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
    }

    jump(frameTimeDelta: number) {
        if (this.jumpPressed) {
            this.velocity = Vec2D.add(
                this.velocity,
                new Vec2D(0, (this.gravity * frameTimeDelta) / 500)
            )

            this.position = Vec2D.add(this.position, Vec2D.mul(this.velocity, this.gravity / 100))
            if (this.position.getY() >= this.yStandingPosition) {
                this.position.setY(this.yStandingPosition)
                this.velocity = new Vec2D(0, -this.gravity)
                this.jumpPressed = false
                this.state = PLAYER_STATES.RUNNING
            }
        }
    }

    duck(frameTimeDelta: number, gameSpeed: number) {
        if (this.isDuck) {
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
    }
}
