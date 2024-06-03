import { canvas } from './../../game-engine/utilities/Config'
import { Scene } from '../../game-engine/scene/Scene'
import { ctx } from '../../game-engine/utilities/Config'
import { GameObject } from '../../game-engine/components/GameObject'

const replayImage = new Image()
replayImage.src = './assets/images/replay.png'
const gameOverImage = new Image()
gameOverImage.src = './assets/images/game_over.png'

export class OverScene extends Scene {
    constructor(obj: GameObject[]) {
        super()
        this.gameObjects = obj
    }

    public load(): void {}

    public update(frameTimeDelta: number, gameSpeed: number): void {}

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render()
        }

        this.renderGameOver()
    }

    private renderGameOver(): void {
        ctx.drawImage(gameOverImage, canvas.width / 2 - 180, canvas.height / 2 - 50)
        ctx.drawImage(replayImage, canvas.width / 2 - 25, canvas.height / 2)
    }

    public unload(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].setToggleActive(false)
        }
        // this.gameObjects = []
    }
}
