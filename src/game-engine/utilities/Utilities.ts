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
