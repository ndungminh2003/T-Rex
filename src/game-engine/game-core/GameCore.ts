import { InputManager } from '../input/InputManager'
import { SceneManager } from '../scene/SceneManager'
import { Scene } from '../scene/Scene'
import { GAME_STATES } from '../utilities/Config'
import { Canvas } from '../canvas/Canvas'
import { ctx, canvas } from '../utilities/Config'

export class GameCore {
    private static instance: GameCore
    public inputManager: InputManager
    public sceneManager: SceneManager
    public canvas: Canvas
    public currentScene: Scene
    public state: number

    constructor() {
        this.state = GAME_STATES.READY
        this.canvas = Canvas.getInstance()
        this.inputManager = InputManager.getInstance()
        this.sceneManager = SceneManager.getInstance()
    }

    //singleton pattern
    public static getInstacne(): GameCore {
        if (!GameCore.instance) {
            return (GameCore.instance = new GameCore())
        }
        return GameCore.instance
    }

    public start(w: number, h: number, startScene: Scene): void {
        this.canvas.init(w, h)
        this.inputManager.start()
        this.sceneManager.loadScene(startScene)
        
    }

    public clearScreen() : void{
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    public update(frameTimeDelta : number, gameSpeed : number): void {
        this.sceneManager.update(frameTimeDelta, gameSpeed)
    }

    public render(): void {
        this.clearScreen()
        this.sceneManager.render()
    }
}

export const gameCore = new GameCore()
