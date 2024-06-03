import { Sprite } from '../../../game-engine/sprite/Sprite'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { Digit } from './Digit'

const WIDTH_OF_DIGIT = 25
const HIGH_SCORE_KEY = 'highScore'

export class Number extends Sprite {
    private length: number
    private listDigit: Digit[]
    private num: number
    private formattedNumber: string
    private highScore: number
    private incrementCounter: number // To slow down the score update

    constructor(pos: Vec2D, length: number = 5) {
        super()
        this.length = length
        this.listDigit = []
        this.position = pos
        this.highScore = window.Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0
        this.incrementCounter = 0 // Initialize the counter

        for (let i = 0; i < length; i++) {
            this.listDigit.push(
                new Digit(new Vec2D(this.position.getX() + i * WIDTH_OF_DIGIT, pos.getY()), 0)
            )
        }

        this.num = 0
        this.formattedNumber = this.stringToNumber(this.num)
    }

    private stringToNumber(num: number): string {
        return num.toLocaleString('en-US', {
            minimumIntegerDigits: this.length,
            useGrouping: false,
        })
    }

    public setNumber(num: number) {
        this.num = num
        this.formattedNumber = this.stringToNumber(this.num)
        for (let i = 0; i < this.length; i++) {
            this.listDigit[i].setDigit(parseInt(this.formattedNumber[i]))
        }

        if (this.num > this.highScore) {
            this.highScore = this.num
            localStorage.setItem(HIGH_SCORE_KEY, this.highScore.toString())
        }
    }

    public getHighScore(): number {
        return this.highScore
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.incrementCounter += frameTimeDelta * gameSpeed * 0.02 // Adjust this value to control speed

        if (this.incrementCounter >= 1) {
            this.incrementCounter = 0
            this.num += 1
            this.setNumber(this.num)
        }
    }

    render() {
        for (let digit of this.listDigit) {
            digit.render()
        }
    }
}
