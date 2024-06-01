import { gameCore } from './game-engine/game-core/GameCore'
import { ctx, canvas } from './game-engine/utilities/Config'
import { ReadyScene } from './game/scenes/ReadyScene'
import { GameScene } from './game/scenes/GameScene'
import { OverScene } from './game/scenes/OverScene'
import { getScaleRatio } from './game-engine/utilities/Utilities'
import { GAME_WIDTH, GAME_HEIGHT } from './game-engine/utilities/Config'
import { GameManager } from './GameManager'
import { gameManager } from './GameManager'

// gameCore.start(GAME_WIDTH * getScaleRatio(), GAME_HEIGHT * getScaleRatio(), new GameScene())

function loop(lastTime: number): void {
    const curTime = Date.now()

    gameManager.render()
    gameManager.update(curTime - lastTime, 1)
    console.log(curTime - lastTime)
    lastTime = Date.now()

    requestAnimationFrame(() => loop(lastTime))
}

loop(Date.now())
