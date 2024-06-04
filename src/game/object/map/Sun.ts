import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'

const sunImage = new Image()
sunImage.src = './assets/images/sun.png'

export class Sun extends Sprite {
    velocity: Vec2D
    constructor(pos: Vec2D, velocity: Vec2D) {
        super()
        this.velocity = velocity
        this.position = pos
        this.width = sunImage.width
        this.height = sunImage.height
        this.image = sunImage
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        // let x = this.position.getX()
        // x -= gameSpeed * frameTimeDelta * gameSpeed * 0.5 + this.velocity.getX()
        // this.position.setX(x)

        this.position.setX(this.position.getX() - gameSpeed * frameTimeDelta * 0.1 + this.velocity.getX())
        console.log(this.position.getX())
        if (this.position.getX() <= -this.width) {
            let x = this.width + window.innerWidth
            this.position.setX(x)
        }
    }
}
