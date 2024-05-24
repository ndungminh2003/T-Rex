export class Score {

  HIGH_SCORE_KEY: string

  ctx : any
  canvas: any
  score: number
  scaleRatio : number

  constructor(ctx : any, scaleRatio : number) {
    
    this.ctx = ctx
    this.canvas = ctx.canvas
    this.score = 0
    this.scaleRatio = scaleRatio 

  }

  reset() {
    this.score = 0
  }

  update(frameTimeDelta : number) {
    this.score += frameTimeDelta * 0.01
  }

  setHighScore() {
    
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY))
    if(this.score > highScore){
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score).toString())
    }
  }

  render(){
    
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY))
    const y = 20 * this.scaleRatio
    const fontsize = 15 * this.scaleRatio
    this.ctx.font = `${fontsize}px serif`
    this.ctx.fillStyle = 'grey'

    const scoreX = this.canvas.width - 60 * this.scaleRatio
    const highScoreX = scoreX - 100

    const scorePadded = Math.floor(this.score).toString().padStart(5, '0');
    const highScorePadded = "Hi: " + highScore.toString().padStart(5, '0');

    this.ctx.fillText(scorePadded, scoreX, y)
    this.ctx.fillText(highScorePadded, highScoreX, y)

  }

}