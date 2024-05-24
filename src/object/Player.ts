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
    isDuck: boolean

    dinoRun1_Image: HTMLImageElement
    dinoRun2_Image: HTMLImageElement

    standingStillImage: HTMLImageElement
    stadingStillEyeCloseImage: HTMLImageElement

    duckImage: HTMLImageElement
    duck2Image: HTMLImageElement

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

        this.x = 10 * this.scaleRatio
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio
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
        this.GRAVITY = 0.4
        this.JUMP_SPEED = 0.6
        this.jumpPressed = false
        this.isDuck = false

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
        if (this.jumpPressed) {
            this.jumpInProgress = true
        }

        if (this.jumpInProgress && !this.falling) {
            this.image = this.stadingStillEyeCloseImage
            if (this.y > this.canvas.height - this.minJumpHeight) {
                this.y -= this.JUMP_SPEED * this.scaleRatio * frameTimeDelta
                
            } else {
                this.falling = true
            }
        } else {
            if (this.y < this.yStandingPosition) {
                this.y += this.GRAVITY * this.scaleRatio * frameTimeDelta
                
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
