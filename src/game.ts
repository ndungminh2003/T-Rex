import { gameManager } from './game/game-state/GameManager'

function loop(lastTime: number): void {
    const curTime = Date.now()

    gameManager.render()
    gameManager.update(curTime - lastTime)
    lastTime = Date.now()

    requestAnimationFrame(() => loop(lastTime))
}

loop(Date.now())
