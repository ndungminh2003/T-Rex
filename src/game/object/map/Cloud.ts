import { Sprite } from '../../../game-engine/sprite/Sprite'
import { ctx } from '../../../game-engine/utilities/Config'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'

const cloudImage = new Image()
cloudImage.src = './assets/images/cloud.png'

export class Cloud extends Sprite {
    constructor(pos: Vec2D) {
        super()

        this.position = pos
        this.width = cloudImage.width
        this.height = cloudImage.height

        this.image = cloudImage
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        let x = this.position.getX()
        x -= gameSpeed * frameTimeDelta * gameSpeed * 0.5
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
