export class Cloud {
  ctx: any
  width: number
  height: number
  scaleRatio: number
  x: number
  y: number
  image: HTMLImageElement
  speed: number

  constructor(ctx: any, width: number, height: number, scaleRatio: number, speed: number) {
      this.ctx = ctx
      this.width = width
      this.height = height
      this.scaleRatio = scaleRatio

      this.x = this.ctx.canvas.width - 40 * this.scaleRatio
      this.y = this.ctx.canvas.height -  250 * this.scaleRatio

      this.image = new Image()
      this.image.src = './assets/images/cloud.png'
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
}
