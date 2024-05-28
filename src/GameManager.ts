import { gameCore } from './game-engine/game-core/GameCore'
import { GAME_HEIGHT, GAME_STATES, GAME_WIDTH } from './game-engine/utilities/Config'
import { GameCore } from './game-engine/game-core/GameCore'
import { ReadyScene } from './game/scenes/ReadyScene'
import { GameScene } from './game/scenes/GameScene'
import { OverScene } from './game/scenes/OverScene'
import { getScaleRatio } from './game-engine/utilities/Utilities'

export class GameManager {
    private static instance: GameManager
    public gameCore: GameCore
    public gameSpeed: number

    constructor() {
        this.gameCore = gameCore
        this.gameCore.start(
            GAME_WIDTH * getScaleRatio(),
            GAME_HEIGHT * getScaleRatio(),
            new GameScene()
        )
        this.gameSpeed = 0.7
    }

    public updateGameSpeed(): void {
        this.gameSpeed += 0.0001
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            return (GameManager.instance = new GameManager())
        }
        return GameManager.instance
    }

    public update(frameTimeDelta: number, gameSpeed: number) {
        switch (this.gameCore.state) {
            case GAME_STATES.READY:
                if (
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
                ) {
                    this.gameCore.state = GAME_STATES.RUNNING
                    // this.gameCore.setCurrentScene(new OverScene())
                }
                this.gameCore.update(0, 0)
                break
            case GAME_STATES.RUNNING:
                this.updateGameSpeed()
                this.gameCore.update(frameTimeDelta, this.gameSpeed)
                break
            case GAME_STATES.GAME_OVER:
                this.gameCore.state = GAME_STATES.GAME_OVER
                this.gameCore.sceneManager.loadScene(new OverScene())
                if (
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
                    gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
                ) {
                    this.gameCore.state = GAME_STATES.RUNNING
                    this.gameCore.sceneManager.loadScene(new GameScene())
                }

                this.gameCore.update(0, 0)
                break
        }
    }

    public render() {
        this.gameCore.render()
    }
}

export const gameManager = GameManager.getInstance()
