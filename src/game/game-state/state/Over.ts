import { State } from './State'
import { GameManager } from '../GameManager'
import { GameScene } from '../../scenes/GameScene'
import { enemyManager } from '../../object/enemy/EnemyManager'
import { Playing } from './Playing'

export class Over extends State {
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
            enemyManager.enemies = []
            this.gameManager.gameCore.changeScene(new GameScene())
            this.gameManager.resetGame()
        }
        this.gameManager.gameCore.update(0, 0)
    }
}
