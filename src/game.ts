import { gameManager } from './game/game-state/GameManager'

function loop(lastTime: number): void {
    const curTime = Date.now()

    gameManager.render()
    let frameTimeDelta = curTime - lastTime

    lastTime = Date.now()
    while (frameTimeDelta >= 1000 / 60) {
        gameManager.update(1000 / 60)
        frameTimeDelta -= 1000 / 60
    }
    gameManager.update(frameTimeDelta)

    requestAnimationFrame(() => loop(lastTime))
}

loop(Date.now())
