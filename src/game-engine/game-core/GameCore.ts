import { InputManager } from '../input/InputManager'
import { SceneManager } from '../scene/SceneManager'
import { Scene } from '../scene/Scene'
import { GameScene } from '../../game/scenes/GameScene'
import { Canvas } from '../canvas/Canvas'

export class GameCore {
    private static instance: GameCore
    public inputManager: InputManager
    public sceneManager: SceneManager
    public canvas: Canvas
    public currentScene: Scene

    constructor() {
        this.canvas = Canvas.getInstance()
        this.inputManager = InputManager.getInstacne()
        this.sceneManager = SceneManager.getInstance()

        this.currentScene = new GameScene(16.67, 1)
    }

    //singleton pattern
    public static getInstacne(): GameCore {
        if (!GameCore.instance) {
            return (GameCore.instance = new GameCore())
        }
        return GameCore.instance
    }

    public start(w: number, h: number): void {
        // this.canvas.init(w, h)
        // this.inputManager.start()
        this.sceneManager.loadScene(new GameScene(16.67, 1))
        console.log('start')
    }

    public update(): void {
        console.log('update')
        this.sceneManager.update()
    }

    public render(): void {
        this.sceneManager.render()
    }
}

export const gameCore = new GameCore()