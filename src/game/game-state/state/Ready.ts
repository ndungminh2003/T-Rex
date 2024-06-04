import { State } from './State'
import { GameManager } from '../GameManager'
import { GameScene } from '../../scenes/GameScene'
import { Playing } from './Playing'

export class Ready extends State {
    constructor(gameManager: GameManager) {
        super(gameManager)
    }

    public update(frameTimeDelta: number): void {
        if (
            this.gameManager.gameCore.inputManager.hasKeyDown(
                this.gameManager.gameCore.inputManager.keyCode.SPACE
            ) ||
            this.gameManager.gameCore.inputManager.hasKeyDown(
                this.gameManager.gameCore.inputManager.keyCode.UP
            )
        ) {
            this.gameManager.changeState(new Playing(this.gameManager))
            this.gameManager.gameCore.changeScene(new GameScene())
        }
        this.gameManager.gameCore.update(0, 0)
    }
}
