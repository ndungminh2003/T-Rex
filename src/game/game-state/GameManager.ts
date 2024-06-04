import { Collider } from '../../game-engine/physics/Collider'
import { gameCore, GameCore } from '../../game-engine/game-core/GameCore'
import { GAME_HEIGHT, GAME_STATES, GAME_WIDTH } from '../../game-engine/utilities/Config'
import { GameScene } from '../scenes/GameScene'
import { OverScene } from '../scenes/OverScene'
import { enemyManager } from '../object/enemy/EnemyManager'
import { Dinosaur } from '../object/player/Dinosaur'
import { State } from './state/State'
import { Ready } from './state/Ready'

const die_Image = new Image()
die_Image.src = './assets/images/die.png'

export class GameManager {
    private static instance: GameManager
    public gameCore: GameCore
    public gameSpeed: number
    public timeSinceLastEnemy: number
    public minTimeBetweenEnemies: number
    public currentState: State

    private constructor() {
        this.currentState = new Ready(this)

        this.gameCore = gameCore
        this.gameCore.start(GAME_WIDTH, GAME_HEIGHT, new GameScene())
        this.gameSpeed = 0.7
        this.timeSinceLastEnemy = 0
        this.minTimeBetweenEnemies = 3000
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }
        return GameManager.instance
    }

    public updateGameSpeed(): void {
        this.gameSpeed += 0.0001
    }

    public update(frameTimeDelta: number): void {
        // switch (this.gameCore.state) {
        //     case GAME_STATES.READY:
        //         if (
        //             this.gameCore.inputManager.hasKeyDown(
        //                 this.gameCore.inputManager.keyCode.SPACE
        //             ) ||
        //             this.gameCore.inputManager.hasKeyDown(this.gameCore.inputManager.keyCode.UP)
        //         ) {
        //             this.gameCore.state = GAME_STATES.RUNNING
        //             this.gameCore.changeScene(new GameScene())
        //         }
        //         this.gameCore.update(0, 0)
        //         break

        //     case GAME_STATES.RUNNING:
        //         this.updateGameSpeed()
        //         this.gameCore.update(frameTimeDelta, this.gameSpeed)

        //         this.timeSinceLastEnemy += frameTimeDelta
        //         this.gameCore.getCurrentScene().getGameObjects()
        //         const player = this.gameCore
        //             .getCurrentScene()
        //             .getGameObjects()
        //             .find((gameObject) => gameObject instanceof Dinosaur) as Dinosaur
        //         const playerCollider = player.getComponent('Collider') as Collider

        //         if (playerCollider) {
        //             enemyManager.enemies.forEach((enemy) => {
        //                 const enemyCollider = enemy.getComponent('Collider') as Collider
        //                 enemyCollider.setHeight(enemy.getHeight())
        //                 enemyCollider.setWidth(enemy.getWidth())
        //                 enemyCollider.setPosition(enemy.getPos())
        //                 playerCollider.setHeight(player.getHeight())
        //                 playerCollider.setWidth(player.getWidth())
        //                 playerCollider.setPosition(player.getPos())

        //                 if (playerCollider.isCollidingWith(enemyCollider)) {
        //                     this.gameCore.state = GAME_STATES.GAME_OVER
        //                     player.setImage(die_Image)
        //                     // player.resetPos()
        //                     this.gameCore.changeScene(
        //                         new OverScene(this.gameCore.getCurrentScene().getGameObjects())
        //                     )
        //                     this.gameCore.getCurrentScene().unload()
        //                 }
        //             })
        //         }

        //         if (this.timeSinceLastEnemy >= this.minTimeBetweenEnemies) {
        //             enemyManager.generateEnemy(this.gameSpeed)
        //             this.timeSinceLastEnemy = 0
        //         }

        //         enemyManager.update(frameTimeDelta, this.gameSpeed)
        //         break

        //     case GAME_STATES.GAME_OVER:
        //         if (
        //             this.gameCore.inputManager.hasKeyDown(
        //                 this.gameCore.inputManager.keyCode.SPACE
        //             ) ||
        //             this.gameCore.inputManager.hasKeyDown(this.gameCore.inputManager.keyCode.UP)
        //         ) {
        //             this.gameCore.state = GAME_STATES.RUNNING
        //             enemyManager.enemies = []
        //             this.gameCore.changeScene(new GameScene())
        //             this.resetGame()
        //         }
        //         this.gameCore.update(0, 0)
        //         break
        // }

        this.currentState.update(frameTimeDelta)

    }

    public resetGame(): void {
        this.gameSpeed = 0.7
    }

    public render(): void {
        this.gameCore.render()
        enemyManager.render()
    }

    public changeState(state: State): void {
        this.currentState = state
    }
}

export const gameManager = GameManager.getInstance()
