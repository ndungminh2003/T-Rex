import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'

const cloudImage = new Image()
cloudImage.src = './assets/images/cloud.png'

export class Cloud extends Sprite {

    velocity: Vec2D
    constructor(pos: Vec2D, velocity: Vec2D) {

        super()
        this.velocity = velocity
        this.position = pos
        this.width = cloudImage.width
        this.height = cloudImage.height
        this.image = cloudImage

    }

    update(frameTimeDelta: number, gameSpeed: number) {
        let x = this.position.getX()
        x -= gameSpeed * frameTimeDelta * gameSpeed * 0.5 + this.velocity.getX()
        this.position.setX(x)

        if (this.position.getX() <= -this.width) {
            let x = this.width + window.innerWidth
            this.position.setX(x)
        }
    }
}
