import { Player } from '../object/player/Player'
import { Ground } from '../object/map/Ground'
import { Cactus } from '../object/enemy/Cactus'
import { Score } from '../object/map/Score'
import { Bird } from '../object/enemy/Bird'
import { Cloud } from '../object/map/Cloud'
import { loadMap, clearScreen, getScaleRatio } from '../game-engine/utilities/Utilities'

var Sprite = {
    player: Player,
    ground: Ground,
    cactus: Cactus,
    bird: Bird,
    score: Score,
    cloud: Cloud
}

export class GameScene {
    sprite: any
    gameConfig: any
    ctx: any
    gameSpeed: number
    groundAndCactusSpeed: number
    previousTime: any

    constructor(gameConfig: any) {
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        this.ctx = ctx
        this.gameConfig = gameConfig
        this.sprite = Sprite

        this.gameSpeed = 1
        this.groundAndCactusSpeed = 0.5

        this.initGame()

        const gameLoop = (currentTime: number | null) => {
            if (this.previousTime === null) {
                this.previousTime = currentTime
                requestAnimationFrame(gameLoop)
                return
            }
            let frameTimeDelta = null
            if (currentTime) {
                frameTimeDelta = currentTime - this.previousTime

            }

            this.previousTime = currentTime
            clearScreen(this.ctx)

            if (frameTimeDelta) {
                this.updateGame(frameTimeDelta)

                if (
                    this.sprite.cactus.collideWith(this.sprite.player) ||
                    this.sprite.bird.collideWith(this.sprite.player)
                ) {
                    this.showGameOver()
                    this.renderGame()
                    this.sprite.score.setHighScore()
                    return
                }

                this.renderGame()

            }

            requestAnimationFrame(gameLoop)
        }

        requestAnimationFrame(gameLoop)
    }

    initGame() {
        loadMap(this.ctx, this.sprite )
    }

    updateGame(frameTimeDelta: number) {
        //update state
        this.sprite.player.update(this.gameSpeed, frameTimeDelta)
        this.sprite.ground.update(this.groundAndCactusSpeed, frameTimeDelta)
        this.sprite.cactus.update(this.groundAndCactusSpeed, frameTimeDelta)
        this.sprite.score.update(frameTimeDelta)
        this.sprite.bird.update(this.groundAndCactusSpeed, frameTimeDelta)
        this.sprite.cloud.update(this.groundAndCactusSpeed, frameTimeDelta)

        //increase game speed
        this.gameSpeed += frameTimeDelta * this.gameConfig.game.GAME_SPEED_INCREMENT
        this.groundAndCactusSpeed += frameTimeDelta * this.gameConfig.game.GAME_SPEED_INCREMENT
    }

    renderGame() {
        this.sprite.player.render()
        this.sprite.ground.render()
        this.sprite.cactus.render()
        this.sprite.score.render()
        this.sprite.bird.render()
        this.sprite.cloud.render()
    }

    showGameOver(this: any) {
        const scaleRatio = getScaleRatio()
        const fontSize = 70 * scaleRatio
        if (this.ctx) {
            this.ctx.font = `${fontSize}px Verdana`
            this.ctx.fillStyle = 'grey'

            const x = this.ctx.canvas.width / 4.5
            const y = this.ctx.canvas.height / 2
            this.ctx.fillText('GAME OVER', x, y)

            let image = new Image()

            image.src = './assets/images/replay.png'
            image.onload = () => {
                this.ctx.drawImage(image, x + 270, y + 20, 60, 60)
            }
        }
    }

    
}
