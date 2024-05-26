import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { ctx } from '../../../game-engine/utilities/Config'
import { gameConfig } from '../../../game-engine/utilities/Config'

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

export class Player extends Sprite {
    scaleRatio: number
    jumpHeight: number

    yStandingPosition: number
    walkAnimationTimer: number

    isDuck: boolean
    isJumping: boolean
    jumpPressed: boolean
    jumpInProgress: boolean
    falling: boolean

    jumpSpeed: number

    constructor(scaleRatio: number, gameSpeed: number) {
        super()
        this.scaleRatio = scaleRatio


        this.width = 58 //* scaleRatio
        this.height = 62 //* scaleRatio
        

        this.jumpHeight = 200

        this.position = new Vec2D(
            10 * this.scaleRatio,
            this.canvas.height - this.height - 1.5 * scaleRatio
        )

        this.yStandingPosition = this.canvas.height - this.height - 1.5 * scaleRatio

        this.image = standingStillImage

        this.walkAnimationTimer = 200

        this.jumpPressed = false
        this.isDuck = false

        this.jumpSpeed = gameConfig.player.JUMP_SPEED

        // window.removeEventListener('keydown', this.keydown)
        // window.removeEventListener('keyup', this.keyup)

        // window.addEventListener('keydown', this.keydown)
        // window.addEventListener('keyup', this.keyup)
    }

    // keydown = (event: { code: string }) => {
    //     if (event.code === 'Space') {
    //         this.jumpPressed = true
    //     } else if (event.code === 'ArrowDown') {
    //         this.isDuck = true
    //     }
    // }

    // keyup = (event: { code: string }) => {
    //     if (event.code === 'Space') {
    //         this.jumpPressed = false
    //     } else if (event.code === 'ArrowDown') {
    //         this.isDuck = false
    //     }
    // }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.run(gameSpeed, frameTimeDelta)
        this.duck(gameSpeed, frameTimeDelta)

        if (this.jumpInProgress) {
            this.image = stadingStillEyeCloseImage
        }

        this.jump(frameTimeDelta)
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

    run(gameSpeed: number, frameTimeDelta: number) {
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
            this.jumpInProgress = true
        }

        if (this.jumpInProgress && !this.falling) {
            this.image = stadingStillEyeCloseImage
            if (this.position.getY() > ctx.canvas.height - this.jumpHeight) {
                this.position.setY(
                    this.position.getY() -
                        gameConfig.player.JUMP_SPEED * this.scaleRatio * frameTimeDelta
                )
            } else {
                this.falling = true
            }
        } else {
            if (this.position.getY() < this.yStandingPosition) {
                this.position.setY(
                    this.position.getY() +
                        gameConfig.player.GRAVITY * this.scaleRatio * frameTimeDelta
                )

                if (this.position.getY() + this.height > ctx.canvas.height) {
                    //this.y = this.yStandingPosition
                    this.position.setY(this.yStandingPosition)
                }
            } else {
                this.falling = false
                this.jumpInProgress = false
                this.jumpPressed = false
            }
        }

        // if (this.jumpPressed) {
        //     this.image = this.stadingStillEyeCloseImage

        //     if (this.y < this.yStandingPosition) {
        //         this.y -= this.jumpSpeed * this.scaleRatio * frameTimeDelta
        //         this.jumpSpeed -= this.jumpSpeed * this.scaleRatio * gameConfig.player.GRAVITY
        //     } else if (this.y >= this.yStandingPosition) {
        //         this.y = this.yStandingPosition
        //         this.jumpSpeed = gameConfig.player.JUMP_SPEED
        //     }
        // }
    }

    duck(gameSpeed: number, frameTimeDelta: number) {
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
