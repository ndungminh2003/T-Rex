import { Component } from '../components/Component'
import { GameObject } from '../components/GameObject'
import { Sprite } from '../sprite/Sprite'

export class Animation extends Component {
    private animationNameRunning: string
    private animationFrame: { [key: string]: HTMLImageElement[] }
    private animationFrameIndex: number
    private animatiomTimer: number
    private sprite: Sprite

    constructor(gameObject: GameObject, sprite: Sprite) {
        super(gameObject)
        this.name = 'Animation'
        this.animatiomTimer = 200
        this.animationFrame = {}
        this.animationFrameIndex = 0
        this.sprite = sprite
    }

    public getAnimationName(): string {
        return this.animationNameRunning
    }

    public addAnimationFrame(animationName: string, frame: HTMLImageElement): void {
        if (!this.animationFrame[animationName]) {
            this.animationFrame[animationName] = []
        }
        this.animationFrame[animationName].push(frame)
    }

    public play(animationName: string, frameTimeDelta: number, gameSpeed: number) {
        if (animationName !== this.animationNameRunning) {
            this.animationNameRunning = animationName
            this.animationFrameIndex = 0 // Reset frame index when switching animations
        }
        this.update(frameTimeDelta, gameSpeed)
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {
        if (this.animatiomTimer <= 0) {
            this.sprite.setImage(
                this.animationFrame[this.animationNameRunning][this.animationFrameIndex]
            )
            this.animationFrameIndex =
                (this.animationFrameIndex + 1) %
                this.animationFrame[this.animationNameRunning].length
            this.animatiomTimer = 100
        }
        this.animatiomTimer -= frameTimeDelta * gameSpeed
    }

    public render(frameTimeDelta: number): void {}
}
