
import { GameObject } from '../components/GameObject'

export abstract class Scene {
    protected gameObjects: Array<GameObject> = []
    protected frameTimeDelta: number
    protected gameSpeed: number

    constructor(frameTimeDelta : number, GameSpeed : number) {
        this.frameTimeDelta = frameTimeDelta
        this.gameSpeed = GameSpeed
    }

    public addGameObject(gameObject: GameObject): void {
      this.gameObjects.push(gameObject)
    }

    public abstract load(): void

    public abstract update(): void

    public abstract render(): void

    public abstract unload(): void

}
