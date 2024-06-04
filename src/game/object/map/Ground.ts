import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'

const groundImage = new Image()
groundImage.src = './assets/images/ground.png'

export class Ground extends Sprite {
    private pos: Vec2D

    constructor(pos: Vec2D) {
        super()

        this.pos = pos
        this.image = groundImage
        this.width = 2400 //groundImage.width
        this.height = 24 //groundImage.height
        this.position = new Vec2D(0 + pos.getX(), this.canvas.height - this.height)
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.position.setX(this.position.getX() - gameSpeed * frameTimeDelta)
        if (this.position.getX() <= -this.width && this.pos.getX() == 0) {
            this.position.setX(0)
        }
        if (this.position.getX() <= 0 && this.pos.getX() == 2400) {
            this.position.setX(2400)
        }
    }
}
