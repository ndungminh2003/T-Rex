import { gameCore, GameCore } from '../../game-engine/game-core/GameCore'
import { GAME_HEIGHT, GAME_WIDTH } from '../../game-engine/utilities/Config'
import { GameScene } from '../scenes/GameScene'
import { enemyManager } from '../object/enemy/EnemyManager'
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
