import { State } from './State'
import { GameManager } from '../GameManager'
import { enemyManager } from '../../object/enemy/EnemyManager'
import { Dinosaur } from '../../object/player/Dinosaur'
import { Collider } from '../../../game-engine/physics/Collider'
import { Over } from './Over'
import { OverScene } from '../../scenes/OverScene'
import { CourchState } from '../../object/player/state/CourchState'

const die_Image = new Image()
die_Image.src = './assets/images/die.png'

export class Playing extends State {
    constructor(gameManager: GameManager) {
        super(gameManager)
    }

    public update(frameTimeDelta: number): void {
        this.gameManager.updateGameSpeed()
        this.gameManager.gameCore.update(frameTimeDelta, this.gameManager.gameSpeed)

        this.gameManager.timeSinceLastEnemy += frameTimeDelta
        this.gameManager.gameCore.getCurrentScene().getGameObjects()
        const player = this.gameManager.gameCore
            .getCurrentScene()
            .getGameObjects()
            .find((gameObject) => gameObject instanceof Dinosaur) as Dinosaur
        const playerCollider = player.getComponent('Collider') as Collider

        if (playerCollider) {
            enemyManager.enemies.forEach((enemy) => {
                const enemyCollider = enemy.getComponent('Collider') as Collider
                enemyCollider.setHeight(enemy.getHeight())
                enemyCollider.setWidth(enemy.getWidth())
                enemyCollider.setPosition(enemy.getPos())
                playerCollider.setHeight(player.getHeight())
                playerCollider.setWidth(player.getWidth())
                playerCollider.setPosition(player.getPos())

                if (playerCollider.isCollidingWith(enemyCollider)) {
                    player.setImage(die_Image)
                    if (player.getCurrentState() instanceof CourchState) {
                        player.resetPos()
                    }
                    this.gameManager.changeState(new Over(this.gameManager))
                    this.gameManager.gameCore.changeScene(
                        new OverScene(this.gameManager.gameCore.getCurrentScene().getGameObjects())
                    )
                    this.gameManager.gameCore.getCurrentScene().unload()
                }
            })
        }

        if (this.gameManager.timeSinceLastEnemy >= this.gameManager.minTimeBetweenEnemies) {
            enemyManager.generateEnemy(this.gameManager.gameSpeed)
            this.gameManager.timeSinceLastEnemy = 0
        }

        enemyManager.update(frameTimeDelta, this.gameManager.gameSpeed)
    }
}
