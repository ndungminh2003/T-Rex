import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Enemy } from './Enemy'

export class Cactus extends Enemy {
    constructor(scaleRatio: number, speed: number, depth : number) {
        super(scaleRatio)

        this.width = 50
        this.height = 50
        this.position = new Vec2D(this.canvas.width * 1.5, this.canvas.height - this.height)
        this.depth = depth

        let cactusImage = new Image()
        cactusImage.src =
            './assets/images/cactus_' + String(Math.floor(Math.random() * 3) + 1) + '.png'

        this.image = cactusImage
    }

    public update(gameSpeed: number, frameTimeDelta: number): void {
        this.position.setX(
            this.position.getX() - gameSpeed * frameTimeDelta * 1 //* this.scaleRatio
        )
    }
}
