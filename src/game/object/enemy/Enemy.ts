import { Collider } from '../../../game-engine/physics/Collider'
import { Sprite } from '../../../game-engine/sprite/Sprite'
import { ctx } from '../../../game-engine/utilities/Config'
import { IEnemy } from '../../../types/IEnemy'


export abstract class Enemy extends Sprite implements IEnemy {
    collider: Collider

    constructor() {
        super()

        this.collider = new Collider(this)
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.position.setX(this.position.getX() - gameSpeed * frameTimeDelta * 1.3)
    }


    render() {
        ctx.drawImage(
            this.image,
            this.getPos().getX(),
            this.getPos().getY(),
            this.width,
            this.height
        )

        if (this.getPos().getX() <= -this.width) {
            this.getPos().setX(this.width + window.innerWidth)
        }
    }
}
