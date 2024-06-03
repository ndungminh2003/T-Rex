import { GameCore } from '../game-core/GameCore'
import { gameCore } from '../game-core/GameCore'


export abstract class Object {
    protected isActive: boolean
    protected isEnabled: boolean
    protected canvas: HTMLCanvasElement
    protected gameCore: GameCore

    constructor() {
        this.isActive = true
        this.isEnabled = true
        this.gameCore = gameCore
        this.canvas = gameCore.canvas.getCanvas()
    }

    public setToggleActive(active: boolean) {
        if (active && !this.isEnabled) {
            this.isEnabled = true
        } else if (!active && this.isEnabled) {
            this.isEnabled = false
        }
    }

    public reset() : void {
        return
    }
}
