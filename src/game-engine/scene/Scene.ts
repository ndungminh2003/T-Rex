import { GameCore, gameCore } from './../game-core/GameCore'
import { GameObject } from '../components/GameObject'

export abstract class Scene {
    protected gameObjects: Array<GameObject> = []
    protected gameCore: GameCore

    constructor() {}

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject)
    }

    public getGameObjects(): Array<GameObject> {
        return this.gameObjects
    }

    public abstract load(): void

    public abstract update(frameTimeDelta: number, gameSpeed: number): void

    public abstract render(): void

    public abstract unload(): void
}
