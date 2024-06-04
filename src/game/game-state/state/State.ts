import { GameManager } from '../GameManager'

export abstract class State {
    protected gameManager: GameManager

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager
    }

    public abstract update(frameTimeDelta : number): void
}
