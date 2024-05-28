import { Sprite } from '../../../game-engine/sprite/Sprite'
import { ctx } from '../../../game-engine/utilities/Config'
import { Dinosaur } from '../player/Dinosaur'

export abstract class Enemy extends Sprite {
    constructor(scaleRatio: number) {
        super()
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.position.setX(
            this.position.getX() - gameSpeed * frameTimeDelta * 1.3 //* this.scaleRatio
        )
    }

    collideWith(player: Dinosaur) {
        const adjustBy = 1.4
        if (
            player.getPos().getX() < this.position.getX() + this.width / adjustBy &&
            player.getPos().getX() + player.getWidth() / adjustBy > this.position.getX() &&
            player.getPos().getY() < this.position.getY() + this.height / adjustBy &&
            player.getPos().getY() + player.getHeight() / adjustBy > this.position.getY()
        ) {
            return true
        } else {
            return false
        }
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
