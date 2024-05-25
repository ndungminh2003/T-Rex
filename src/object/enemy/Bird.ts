import { Enemy } from './Enemy'

export class Bird extends Enemy {

    private flyAnimationTimer: number
    private bird1Image: HTMLImageElement
    private bird2Image: HTMLImageElement
    

    constructor(
        canvas: any,
        ctx: any,
        width: number,
        height: number,
        scaleRatio: number,
        speed: number
    ) {
        super(canvas, ctx, width, height, scaleRatio, speed)

        this.x = this.canvas.width * 1.7
        this.y = this.canvas.height - this.height * 6

        this.bird1Image = new Image()
        this.bird1Image.src = './assets/images/bird_1.png'

        this.bird2Image = new Image()
        this.bird2Image.src = './assets/images/bird_2.png'

        this.image = this.bird1Image
        this.flyAnimationTimer = 100
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.fly(gameSpeed, frameTimeDelta)
        super.update(gameSpeed, frameTimeDelta)
    }

    fly(gameSpeed: number, frameTimeDelta: number) {
        if (this.flyAnimationTimer <= 0) {
            if (this.image === this.bird1Image) {
                this.image = this.bird2Image
            } else {
                this.image = this.bird1Image
            }
            this.flyAnimationTimer = 200
        }
        this.flyAnimationTimer -= frameTimeDelta * gameSpeed
    }
}
