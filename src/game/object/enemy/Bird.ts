import { Sprite } from '../../../game-engine/sprite/Sprite'
import { ctx } from '../../../game-engine/utilities/Config'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'

const birdImage1 = new Image()
birdImage1.src = './assets/images/bird_1.png'

const birdImage2 = new Image()
birdImage2.src = './assets/images/bird_2.png'

export class Bird extends Sprite {
    private flyAnimationTimer: number
    private scaleRatio: number
    private speed: number

    constructor(scaleRatio: number, speed: number) {
        super()

        this.width = 50 //* scaleRatio
        this.height = 50 //* scaleRatio
        this.position = new Vec2D(0, 0)
        
        this.scaleRatio = scaleRatio
        this.speed = speed

        this.image = birdImage1
        this.flyAnimationTimer = 100
    }

    update(frameTimeDelta: number, gameSpeed: number,) {
        this.fly(gameSpeed, frameTimeDelta)
        this.position.setX(
            this.position.getX() - gameSpeed * frameTimeDelta * this.speed //* this.scaleRatio
        )
    }

    fly(frameTimeDelta: number, gameSpeed: number, ) {
        if (this.flyAnimationTimer <= 0) {
            if (this.image === birdImage1) {
                this.image = birdImage2
            } else {
                this.image = birdImage1
            }
            this.flyAnimationTimer = 200
        }
        this.flyAnimationTimer -= frameTimeDelta * gameSpeed
    }

    collideWith(player: any) {
        const adjustBy = 1.4

        if (
            player.x < this.position.getX() + this.width / adjustBy &&
            player.x + player.width / adjustBy > this.position.getX() &&
            player.y < this.position.getY() + this.height / adjustBy &&
            player.y + player.height / adjustBy > this.position.getY()
        ) {
            return true
        } else {
            return false
        }
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
            this.position.setX(this.width + window.innerWidth)
        }
    }
}
