import { gameCore } from './game-engine/game-core/GameCore'
import { ctx, canvas } from './game-engine/utilities/Config'

gameCore.start(800, 300)

function clearScreen() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function loop(lastTime: number): void {
    const curTime = Date.now()
    clearScreen()
    gameCore.render()
    gameCore.update()
    lastTime = Date.now()
    requestAnimationFrame(() => loop(lastTime))
}

loop(Date.now())
