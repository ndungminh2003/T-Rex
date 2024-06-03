import { GameObject } from '../components/GameObject'
import { ctx } from '../utilities/Config'

export abstract class Sprite extends GameObject {
    protected image: HTMLImageElement

    constructor() {
        super()
    }

    public getImage(): HTMLImageElement {
        return this.image
    }

    public setImage(image: HTMLImageElement) {
        this.image = image
    }

    public render(): void {
        ctx.drawImage(this.image, this.position.getX(), this.position.getY())
    }

    public abstract update(frameTimeDelta: number, gameSpeed: number): void
}
