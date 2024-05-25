import { gameConfig } from '../../game-engine/utilities/Config'

// enum playerState {
//     run,
//     jump,
//     duck
// }

export class Player {
    ctx: any
    width: number
    height: number
    scaleRatio: number
    jumpHeight: number
    x: number
    y: number
    yStandingPosition: number

    walkAnimationTimer: number

    isDuck: boolean
    isJumping: boolean
    jumpPressed: boolean
    jumpInProgress: boolean
    falling: boolean

    dinoRun1_Image: HTMLImageElement
    dinoRun2_Image: HTMLImageElement

    standingStillImage: HTMLImageElement
    stadingStillEyeCloseImage: HTMLImageElement

    duckImage: HTMLImageElement
    duck2Image: HTMLImageElement

    image: HTMLImageElement

    jumpSpeed: number

    constructor(ctx: any, width: number, height: number, scaleRatio: number, jumpHeight: number) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.scaleRatio = scaleRatio
        this.jumpHeight = jumpHeight
        this.x = 10 * this.scaleRatio
        this.y = this.ctx.canvas.height - this.height - 1.5 * scaleRatio
        this.yStandingPosition = this.y

        this.standingStillImage = new Image()
        this.standingStillImage.src = './assets/images/standing_still.png'

        this.dinoRun1_Image = new Image()
        this.dinoRun1_Image.src = './assets/images/dino_run1.png'

        this.dinoRun2_Image = new Image()
        this.dinoRun2_Image.src = './assets/images/dino_run2.png'

        this.duckImage = new Image()
        this.duckImage.src = './assets/images/duck.png'

        this.duck2Image = new Image()
        this.duck2Image.src = './assets/images/duck_2.png'

        this.stadingStillEyeCloseImage = new Image()
        this.stadingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

        this.image = this.standingStillImage

        this.walkAnimationTimer = 200

        this.jumpPressed = false
        this.isDuck = false

        this.jumpSpeed = gameConfig.player.JUMP_SPEED

        window.removeEventListener('keydown', this.keydown)
        window.removeEventListener('keyup', this.keyup)

        window.addEventListener('keydown', this.keydown)
        window.addEventListener('keyup', this.keyup)
    }

    keydown = (event: { code: string }) => {
        if (event.code === 'Space') {
            this.jumpPressed = true
        } else if (event.code === 'ArrowDown') {
            this.isDuck = true
        }
    }

    keyup = (event: { code: string }) => {
        if (event.code === 'Space') {
            this.jumpPressed = false
        } else if (event.code === 'ArrowDown') {
            this.isDuck = false
        }
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.run(gameSpeed, frameTimeDelta)
        this.duck(gameSpeed, frameTimeDelta)

        if (this.jumpInProgress) {
            this.image = this.standingStillImage
        }

        this.jump(frameTimeDelta)
    }

    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    run(gameSpeed: number, frameTimeDelta: number) {
        if (!this.isDuck) {
            if (this.walkAnimationTimer <= 0) {
                if (this.image === this.dinoRun1_Image) {
                    this.image = this.dinoRun2_Image
                } else {
                    this.image = this.dinoRun1_Image
                }
                this.walkAnimationTimer = 200
            }
            this.walkAnimationTimer -= frameTimeDelta * gameSpeed
        }
    }

    jump(frameTimeDelta: number) {
        // if (this.jumpPressed) {
        //     this.jumpInProgress = true
        // }

        // if (this.jumpInProgress && !this.falling) {
        //     this.image = this.stadingStillEyeCloseImage
        //     if (this.y > this.ctx.canvas.height - this.jumpHeight) {
        //         this.y -= gameConfig.player.JUMP_SPEED * this.scaleRatio * frameTimeDelta
        //     } else {
        //         this.falling = true
        //     }
        // } else {
        //     if (this.y < this.yStandingPosition) {
        //         this.y += gameConfig.player.GRAVITY * this.scaleRatio * frameTimeDelta

        //         if (this.y + this.height > this.ctx.canvas.height) {
        //             this.y = this.yStandingPosition
        //         }
        //     } else {
        //         this.falling = false
        //         this.jumpInProgress = false
        //         this.jumpPressed = false
        //     }
        // }

        if (this.jumpPressed) {
            this.image = this.stadingStillEyeCloseImage

            if (this.y < this.yStandingPosition) {
                this.y -= this.jumpSpeed * this.scaleRatio * frameTimeDelta
                this.jumpSpeed -= this.jumpSpeed * this.scaleRatio * gameConfig.player.GRAVITY
            } else if (this.y >= this.yStandingPosition) {
                this.y = this.yStandingPosition
                this.jumpSpeed = gameConfig.player.JUMP_SPEED
            }
        }
    }

    duck(gameSpeed: number, frameTimeDelta: number) {
        if (this.isDuck) {
            if (this.walkAnimationTimer <= 0) {
                if (this.image === this.duckImage) {
                    this.image = this.duck2Image
                } else {
                    this.image = this.duckImage
                }
                this.walkAnimationTimer = 200
            }
            this.walkAnimationTimer -= frameTimeDelta * gameSpeed
        }
    }
}
