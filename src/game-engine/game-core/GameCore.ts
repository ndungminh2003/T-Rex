import { InputManager } from '../input/InputManager'
import { Canvas } from '../canvas/Canvas'

export class GameCore {
    private static instance: GameCore
    public inputManager: InputManager
    public canvas: Canvas

    constructor() {
        this.canvas = Canvas.getInstance()
        this.inputManager = InputManager.getInstacne()
    }

    //singleton pattern
    public static getInstacne(): GameCore {
        if (!GameCore.instance) {
            return (GameCore.instance = new GameCore())
        }
        return GameCore.instance
    }

    public start(w: number, h: number): void {
        this.canvas.init(w, h)
        this.inputManager.start()
    }

}

export const gameCore = new GameCore()