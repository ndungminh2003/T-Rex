import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Enemy } from './Enemy'

export class Cactus extends Enemy {
    constructor(depth: number) {
        super()
        this.depth = depth

        let cactusImage = new Image()
        cactusImage.src =
            './assets/images/cactus_' + String(Math.floor(Math.random() * 3) + 1) + '.png'

        this.image = cactusImage
        this.width = this.image.width
        this.height = this.image.height
        this.position = new Vec2D(this.canvas.width * 1.5, this.canvas.height - this.height)
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {
        this.position.setX(this.position.getX() - gameSpeed * frameTimeDelta)

        if (this.getPos().getX() <= -this.width) {
            this.getPos().setX(this.width + window.innerWidth)
        }
    }
}
