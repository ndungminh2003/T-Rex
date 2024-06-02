import { canvas } from './../../game-engine/utilities/Config'
import { Dinosaur } from '../object/player/Dinosaur'
import { Ground } from './../object/map/Ground'
import { Scene } from '../../game-engine/scene/Scene'

import { Score } from '../object/map/Score'
import { Bird } from '../object/enemy/Bird'
import { Cloud } from '../object/map/Cloud'
import { ctx } from '../../game-engine/utilities/Config'
import { Vec2D } from '../../game-engine/utilities/Vec2D'

const replayImage = new Image()
replayImage.src = './assets/images/replay.png'
const gameOverImage = new Image()
gameOverImage.src = './assets/images/game_over.png'

export class OverScene extends Scene {
    player: Dinosaur
    ground: Ground
    score: Score
    bird: Bird
    cloud: Cloud

    public load(): void {
        // this.player = new Dinosaur()
        // this.ground = new Ground()
        // this.score = new Score()
        // // this.bird = new Bird(new Vec2D(30, 150), 13);
        // this.cloud = new Cloud()

        // this.addGameObject(this.player)
        // this.addGameObject(this.ground)
        // this.addGameObject(this.score)
        // // this.addGameObject(this.bird);
        // this.addGameObject(this.cloud)
    }

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
        this.gameObjects = []
    }
}
