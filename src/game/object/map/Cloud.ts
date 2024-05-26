import { Sprite } from '../../../game-engine/sprite/Sprite'
import { ctx } from '../../../game-engine/utilities/Config'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'

const cloudImage = new Image()
cloudImage.src = './assets/images/cloud.png'

export class Cloud extends Sprite {
    private scaleRatio: number
    private speed: number

    constructor(scaleRatio: number, speed: number) {
        super()

        this.width = 30 * scaleRatio
        this.height = 20 * scaleRatio

        this.scaleRatio = scaleRatio

        this.position = new Vec2D(
            this.canvas.width - 40 * this.scaleRatio,
            this.canvas.height - 250 * this.scaleRatio
        )

        this.speed = speed
        this.image = cloudImage
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        let x = this.position.getX()
        x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio
        this.position.setX(x)
    }

    render() {
        ctx.drawImage(
            this.image,
            this.position.getX(),
            this.position.getY(),
            this.width,
            this.height
        )

        if (this.position.getX() <= -this.width) {
            let x = this.width + window.innerWidth
            this.position.setX(x)
        }
    }
}
