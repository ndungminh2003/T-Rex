import { eventManager } from 'react-toastify/dist/core'

export class Player {
    ctx: any
    width: number
    height: number
    scaleRatio: number
    maxJumpHeight: number
    minJumpHeight: number
    x: number
    y: number
    walkAnimationTimer: number
    isJumping: boolean
    jumpPressed: boolean
    jumpInProgress: boolean
    falling: boolean
    JUMP_SPEED: number
    GRAVITY: number
    canvas: any
    yStandingPosition: number

    dinoRun1_Image: HTMLImageElement
    dinoRun2_Image: HTMLImageElement

    standingStillImage: HTMLImageElement
    stadingStillEyeCloseImage: HTMLImageElement

    image: HTMLImageElement

    constructor(
        canvas: any,
        ctx: any,
        width: number,
        height: number,
        scaleRatio: number,
        maxJumpHeight: number,
        minJumpHeight: number
    ) {
        this.canvas = canvas
        this.ctx = ctx
        this.width = width
        this.height = height
        this.scaleRatio = scaleRatio
        this.maxJumpHeight = maxJumpHeight
        this.minJumpHeight = minJumpHeight

        this.x = 10 * scaleRatio
        this.y = 200 * scaleRatio - this.height
        this.yStandingPosition = this.y

        this.standingStillImage = new Image()
        this.standingStillImage.src = './assets/images/standing_still.png'

        this.dinoRun1_Image = new Image()
        this.dinoRun1_Image.src = './assets/images/dino_run1.png'

        this.dinoRun2_Image = new Image()
        this.dinoRun2_Image.src = './assets/images/dino_run2.png'
        

        this.stadingStillEyeCloseImage = new Image()
        this.stadingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

        this.image = this.standingStillImage

        this.walkAnimationTimer = 200
        this.GRAVITY = 0.4
        this.JUMP_SPEED = 0.6
        this.jumpPressed = false

        window.addEventListener('keyup', this.keyup)
    }

    keyup = (event: { code: string }) => {
        this.jumpPressed = true
    }

    update() {
        this.run()

        if (this.jumpInProgress) {
            this.image = this.standingStillImage;
        }

        this.jump()
    }

    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    run() {
        if (this.image === this.dinoRun1_Image) {
            this.image = this.dinoRun2_Image
        } else {
            this.image = this.dinoRun1_Image
        }
    }

    jump() {
        if (this.jumpPressed) {
            this.jumpInProgress = true
        }

        if (this.jumpInProgress && !this.falling) {

            this.image = this.stadingStillEyeCloseImage
            if (
                this.y > this.canvas.height - this.minJumpHeight ||
                (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
            ) {
                this.y -= this.JUMP_SPEED * this.scaleRatio * 5
            } else {
                this.falling = true
            }
        } else {
            if (this.y < this.yStandingPosition) {
                this.y += this.GRAVITY * this.scaleRatio * 5
                if (this.y + this.height > this.canvas.height) {
                    this.y = this.yStandingPosition
                }
            } else {
                this.falling = false
                this.jumpInProgress = false
                this.jumpPressed = false
            }
        }
    }

    duck() {}
}

/*  
    while(is_running){
        input
        update
        render
    }

*/
