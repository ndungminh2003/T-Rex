export class Cactus {
    canvas : any
    ctx: any
    width: number
    height: number
    scaleRatio: number
    x: number
    y: number
    speed: number

    cactusImage: HTMLImageElement
    image: HTMLImageElement

    constructor(canvas: any, ctx: any, width: number, height: number, scaleRatio: number, speed: number) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.scaleRatio = scaleRatio
        this.canvas = canvas

        this.x = this.canvas.width * 1.5;
        this.y = this.canvas.height - this.height; 

        this.cactusImage = new Image()
        this.cactusImage.src = './assets/images/cactus_1.png'
        this.image = this.cactusImage
        this.speed = speed
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio
    }

    render() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        if (this.x <= -this.width) {
            this.x = this.width + window.innerWidth
        }
    }

    collideWith(player: any) {
      
      const adjustBy = 1.4;
      
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
}
