import { ctx } from '../../../game-engine/utilities/Config'
import { GameObject } from '../../../game-engine/components/GameObject'

export class Score extends GameObject {
    HIGH_SCORE_KEY: string
    score: number
    scaleRatio: number

    constructor(scaleRatio: number) {
        super()
        this.score = 0
        this.scaleRatio = scaleRatio
    }

    reset() {
        this.score = 0
    }

    update(frameTimeDelta: number) {
        this.score += frameTimeDelta * 0.01
    }

    render() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY))
        const y = 20 * this.scaleRatio
        const fontsize = 15 * this.scaleRatio
        ctx.font = `${fontsize}px serif`
        ctx.fillStyle = 'grey'

        const scoreX = this.canvas.width - 60 * this.scaleRatio
        const highScoreX = scoreX - 150

        const scorePadded = Math.floor(this.score).toString().padStart(5, '0')
        const highScorePadded = 'Hi: ' + highScore.toString().padStart(5, '0')

        ctx.fillText(scorePadded, scoreX, y)
        ctx.fillText(highScorePadded, highScoreX, y)
    }

    setHighScore() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY))
        if (this.score > highScore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score).toString())
        }
    }
}
