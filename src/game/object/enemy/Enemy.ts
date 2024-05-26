export abstract class Enemy {
    protected ctx: any
    protected canvas: any
    protected width: number
    protected height: number
    protected scaleRatio: number
    protected speed: number
    protected x: number
    protected y: number
    protected image: HTMLImageElement

    constructor(
        canvas: any,
        ctx: any,
        width: number,
        height: number,
        scaleRatio: number,
        speed: number
    ) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.scaleRatio = scaleRatio
        this.canvas = canvas
        this.speed = speed
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio
    }

    collideWith(player: any) {
        const adjustBy = 1.4

        if (
            player.x < this.x + this.width / adjustBy &&
            player.x + player.width / adjustBy > this.x &&
            player.y < this.y + this.height / adjustBy &&
            player.y + player.height / adjustBy > this.y
        ) {
            return true
        } else {
            return false
        }
    }

    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        if (this.x <= -this.width) {
            this.x = this.width + window.innerWidth
        }
    }
}
