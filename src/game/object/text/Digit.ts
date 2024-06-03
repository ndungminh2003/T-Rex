import { Vec2D } from './../../../game-engine/utilities/Vec2D';
import { Sprite } from '../../../game-engine/sprite/Sprite'
import { ctx } from '../../../game-engine/utilities/Config'

export class Digit extends Sprite {
    digit: number
    image: HTMLImageElement

    constructor(pos: Vec2D, digit: number) {
        super()
        this.digit = digit
        this.position = pos
        this.image = new Image()
        this.setDigit(digit) // Initialize image source
    }

    public setDigit(digit: number) {
        this.digit = digit
        this.image.src = `./assets/images/number/${this.digit}_digit.png`
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        throw new Error('Method not implemented.')
    }

    render() {
        ctx.drawImage(this.image, this.position.getX(), this.position.getY())
    }
}
