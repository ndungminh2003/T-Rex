import { Scene } from './Scene'
import { gameCore } from '../game-core/GameCore'

export class SceneManager {
    public static instance: SceneManager
    public currentScene: Scene

    constructor() {
        return
    }

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            return (SceneManager.instance = new SceneManager())
        }
        return SceneManager.instance
    }

    public loadScene(scene: Scene): void {
        if (this.currentScene) {
            this.currentScene.unload()
        }

        this.currentScene = scene
        this.currentScene.load()
    }

    public update(frameTimeDelta : number, gameSpeed : number): void {
        this.currentScene.update(frameTimeDelta, gameSpeed)
    }

    public render(): void {
        this.currentScene.render()
    }

    public getCurrentScene() : Scene {
        return this.currentScene
    }
}
