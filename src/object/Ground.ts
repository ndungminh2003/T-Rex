export class Ground {
    ctx: any
    width: number
    height: number
    scaleRatio: number
    x: number
    y: number
    image: HTMLImageElement
    speed : number

    constructor(ctx: any, width: number, height: number, scaleRatio: number, speed : number) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.scaleRatio = scaleRatio

        this.x = 0
        this.y = 250

        this.image = new Image()
        this.image.src = './assets/images/ground.png'
        this.speed = speed
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio; 
    }

    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)

        if (this.x <= -this.width) {
            this.x = 0
        }
    }
}
