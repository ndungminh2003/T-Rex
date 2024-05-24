import { Bird } from '../object/Bird'
import { Cactus } from '../object/Cactus'
import { Ground } from '../object/Ground'
import { Player } from '../object/Player'
import { Score } from '../object/Score'
import { gameConfig } from './Config'

export function getScaleRatio() {
    const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight)

    const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth)

    if (screenWidth / screenHeight < gameConfig.game.GAME_WIDTH / gameConfig.game.GAME_HEIGHT) {
        return screenWidth / gameConfig.game.GAME_WIDTH
    } else {
        return screenHeight / gameConfig.game.GAME_HEIGHT
    }
}

export function clearScreen(ctx: any) {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export function loadMap(ctx: any, sprite: any) {
    const scaleRatio = getScaleRatio()
    ctx.canvas.width = gameConfig.game.GAME_WIDTH * scaleRatio
    ctx.canvas.height = gameConfig.game.GAME_HEIGHT * scaleRatio
    createSprites(scaleRatio, sprite, ctx)
}

function createSprites(scaleRatio: number, sprite: any, ctx: any) {
    const playerWidthInGame = gameConfig.player.PLAYER_WIDTH * scaleRatio
    const playerHeightInGame = gameConfig.player.PLAYER_HEIGHT * scaleRatio
    const minJumpHeightInGame = gameConfig.player.JUMP_HEIGHT * scaleRatio
    const groundWidthInGame = gameConfig.ground.GROUND_WIDTH * scaleRatio
    const groundHeightInGame = gameConfig.ground.GROUND_HEIGHT * scaleRatio
    const cactusWidthInGame = gameConfig.cactus.CACTUS_WIDTH * scaleRatio
    const cactusHeightInGame = gameConfig.cactus.CACTUS_HEIGHT * scaleRatio

    const player = new Player(
        ctx.canvas,
        ctx,
        playerWidthInGame,
        playerHeightInGame,
        scaleRatio,
        minJumpHeightInGame,
        minJumpHeightInGame
    )

    const ground = new Ground(
        ctx.canvas,
        ctx,
        groundWidthInGame,
        groundHeightInGame,
        scaleRatio,
        gameConfig.game.GROUND_AND_CACTUS_SPEED
    )

    const cactus = new Cactus(
        ctx.canvas,
        ctx,
        cactusWidthInGame,
        cactusHeightInGame,
        scaleRatio,
        gameConfig.game.GROUND_AND_CACTUS_SPEED
    )

    const bird = new Bird(
        ctx.canvas,
        ctx,
        cactusWidthInGame,
        cactusHeightInGame,
        scaleRatio,
        gameConfig.game.GROUND_AND_CACTUS_SPEED
    )

    const score = new Score(ctx, scaleRatio)

    sprite.player = player
    sprite.ground = ground
    sprite.cactus = cactus
    sprite.bird = bird
    sprite.score = score
}
