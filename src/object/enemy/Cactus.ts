import { Enemy } from './Enemy'

export class Cactus extends Enemy {
    private cactusImage: HTMLImageElement

    constructor(
        canvas: any,
        ctx: any,
        width: number,
        height: number,
        scaleRatio: number,
        speed: number
    ) {
        super(canvas, ctx, width, height, scaleRatio, speed)

        this.x = this.canvas.width * 1.5
        this.y = this.canvas.height - this.height

        this.cactusImage = new Image()
        this.cactusImage.src = './assets/images/cactus_1.png'
        this.image = this.cactusImage
    }
}
