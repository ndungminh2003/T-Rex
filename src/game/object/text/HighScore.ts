import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Character } from './Character'
import { Digit } from './Digit'

const HIGH_SCORE_KEY = 'highScore'

export class HighScore extends Sprite {
    private hChar: Character
    private iChar: Character
    private highScore: number

    constructor(pos: Vec2D) {
        super()
        this.position = pos
        this.hChar = new Character(new Vec2D(this.position.getX(), this.position.getY()), 'H')
        this.iChar = new Character(new Vec2D(this.position.getX() + 22, this.position.getY()), 'I')
        this.highScore = Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0 
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        
    }

    render() {
        this.hChar.render()
        this.iChar.render()

        const highScoreString = this.highScore.toString().padStart(5, '0')
        let xOffset = 65

        for (let i = 0; i < highScoreString.length; i++) {
            const digitChar = highScoreString[i]
            const digit = new Digit(
                new Vec2D(this.position.getX() + xOffset, this.position.getY()),
                parseInt(digitChar)
            )
            digit.render()
            xOffset += 25
        }
    }
}
