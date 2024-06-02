import { ctx } from '../../../game-engine/utilities/Config'
import { GameObject } from '../../../game-engine/components/GameObject'

export class Score extends GameObject {
    HIGH_SCORE_KEY: string
    score: number
    scaleRatio: number

    constructor() {
        super()
        this.score = 0
    }

    public reset(): void {
        this.score = 0
    }

    public getScore(): number {
        return this.score
    }

    public update(frameTimeDelta: number): void {
        this.score += frameTimeDelta * 0.01
    }

    public render(): void {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY))
        const y = 20
        const fontsize = 15
        ctx.font = `${fontsize}px serif`
        ctx.fillStyle = 'grey'

        const scoreX = this.canvas.width - 60
        const highScoreX = scoreX - 150

        const scorePadded = Math.floor(this.score).toString().padStart(5, '0')
        const highScorePadded = 'Hi: ' + highScore.toString().padStart(5, '0')

        ctx.fillText(scorePadded, scoreX, y)
        ctx.fillText(highScorePadded, highScoreX, y)
    }

    public setHighScore(): void {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY))
        if (this.score > highScore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score).toString())
        }
    }
}
