import { GameObject } from '../components/GameObject'

export abstract class Sprite extends GameObject {
    protected image: HTMLImageElement

    constructor() {
        super()
    }

    public abstract render(): void
    public abstract update(gameSpeed : number, frameTimeDelta: number): void
}
