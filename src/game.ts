import { Player } from './entities/Player'
import { Ground } from './entities/Ground'
import { Cactus } from './entities/Cactus'

class Game {
    constructor() {
        const canvas = document.getElementById('game') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')

        const GAME_WIDTH = 800
        const GAME_HEIGHT = 200
        const PLAYER_WIDTH = 88 / 1.5
        const PLAYER_HEIGHT = 94 / 1.5
        const MAX_JUMP_HEIGHT = GAME_HEIGHT
        const MIN_JUMP_HEIGHT = 150

        const GROUND_WIDTH = 2400
        const GROUND_HEIGHT = 24

        const CACTUS_WIDTH = 45
        const CACTUS_HEIGHT = 30

        const GROUND_AND_CACTUS_SPEED = 0.5

        let scaleRatio: number | null = null
        let player: Player | null = null
        let previousTime: number | null = null
        let ground: Ground | null = null
        let cactus: Cactus | null = null

        function setScreen() {
            scaleRatio = getScaleRatio()
            canvas.width = GAME_WIDTH * scaleRatio
            canvas.height = GAME_HEIGHT * scaleRatio
            createSprites()
        }

        function createSprites() {
            const playerWidthInGame = scaleRatio ? PLAYER_WIDTH * scaleRatio : 0
            const playerHeightInGame = scaleRatio ? PLAYER_HEIGHT * scaleRatio : 0
            const minJumpHeightInGame = scaleRatio ? MIN_JUMP_HEIGHT * scaleRatio : 0
            const maxJumpHeightInGame = scaleRatio ? MAX_JUMP_HEIGHT * scaleRatio : 0
            const scaleRatioInGame = scaleRatio ? scaleRatio : 0

            const groundWidthInGame = scaleRatio ? GROUND_WIDTH * scaleRatio : 0
            const groundHeightInGame = scaleRatio ? GROUND_HEIGHT * scaleRatio : 0

            const cactusWidthInGame = scaleRatio ? CACTUS_WIDTH * scaleRatio : 0
            const cactusHeightInGame = scaleRatio ? CACTUS_HEIGHT * scaleRatio : 0

            player = new Player(
                canvas,
                ctx,
                playerWidthInGame,
                playerHeightInGame,
                scaleRatioInGame,
                maxJumpHeightInGame,
                minJumpHeightInGame
            )

            ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, scaleRatioInGame)

            cactus = new Cactus(ctx, cactusWidthInGame, cactusHeightInGame, scaleRatioInGame)
        }

        function getScaleRatio() {
            const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight)

            const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth)

            if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
                return screenWidth / GAME_WIDTH
            } else {
                return screenHeight / GAME_HEIGHT
            }
        }

        setScreen()

        function clearScreen() {
            if (ctx) {
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
        }

        function gameLoop(currentTime: number | null) {
            if (previousTime === null) {
                previousTime = currentTime
                requestAnimationFrame(gameLoop)
                return
            }
            if (currentTime) {
                const frameTimeDelta = currentTime - previousTime
            }

            previousTime = currentTime
            clearScreen()

            if (player && ground && cactus) {
                player.update()
                ground.update(GROUND_AND_CACTUS_SPEED, 0)
                cactus.update()
                
                if(cactus.collideWith(player)){
                    return
                }

                player.render()
                ground.render()
                cactus.render()
                
            }

            requestAnimationFrame(gameLoop)
        }

        requestAnimationFrame(gameLoop)
    }
}

new Game()
