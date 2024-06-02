import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { ctx } from '../../../game-engine/utilities/Config'

const groundImage = new Image()
groundImage.src = './assets/images/ground.png'

export class Ground extends Sprite {
    constructor() {
        super()

        this.width = groundImage.width
        this.height = groundImage.height
        this.position = new Vec2D(0, this.canvas.height - this.height)

        this.image = groundImage
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.position.setX(this.position.getX() - gameSpeed * frameTimeDelta)
    }

    render() {
        ctx.drawImage(
            this.image,
            this.position.getX(),
            this.position.getY(),
            this.width,
            this.height
        )
        ctx.drawImage(
            this.image,
            this.position.getX() + this.width,
            this.position.getY(),
            this.width,
            this.height
        )

        if (this.position.getX() <= -this.width) {
            this.position.setX(0)
        }
    }
}
