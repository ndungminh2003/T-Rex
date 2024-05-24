export class Bird  {
    ctx: any
    canvas: any
    width: number
    height: number
    scaleRatio: number
    x: number
    y: number
    speed: number
    flyAnimationTimer: number

    bird1Image: HTMLImageElement
    bird2Image: HTMLImageElement

    image: HTMLImageElement

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

        this.x = this.canvas.width * 1.7
        this.y = this.canvas.height - this.height * 6

        this.bird1Image = new Image()
        this.bird1Image.src = './assets/images/bird_1.png'

        this.bird2Image = new Image()
        this.bird2Image.src = './assets/images/bird_2.png'

        this.image = this.bird1Image
        this.speed = speed
        this.flyAnimationTimer = 100
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        this.fly(gameSpeed, frameTimeDelta)
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio
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

    render() {

        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        if (this.x <= -this.width) {
            this.x = this.width + window.innerWidth
        }
    }
}
