import { Dinosaur } from './../object/player/Dinosaur';
// import { DinosaurManager } from '../object/player/DinosaurManager'
import { Ground } from './../object/map/Ground'
import { Scene } from '../../game-engine/scene/Scene'
import { Cloud } from '../object/map/Cloud'
import { canvas } from '../../game-engine/utilities/Config'
import { Vec2D } from '../../game-engine/utilities/Vec2D'
import { Score } from '../object/map/Score'
import { Number } from '../object/text/Number'
import { HighScore } from '../object/text/HighScore'

export class ReadyScene extends Scene {
    public player: Dinosaur
    public ground: Ground
    public score: Number
    public highScore: HighScore
    public cloud: Cloud
    public cloud1: Cloud
    public cloud2: Cloud

    public load(): void {
        this.ground = new Ground()
        this.player = new Dinosaur()
        this.score = new Number(new Vec2D(canvas.width - 150, 50), 5)
        this.cloud = new Cloud(new Vec2D(canvas.width, 50))
        this.highScore = new HighScore(new Vec2D(canvas.width - 400, 50))
        this.cloud = new Cloud(new Vec2D(canvas.width - 50, 100))
        this.cloud1 = new Cloud(new Vec2D(canvas.width - 250, 130))
        this.cloud2 = new Cloud(new Vec2D(canvas.width - 120, 200))

        this.addGameObject(this.player)
        this.addGameObject(this.ground)
        this.addGameObject(this.cloud)
        this.addGameObject(this.cloud1)
        this.addGameObject(this.cloud2)
        this.addGameObject(this.score)
        this.addGameObject(this.highScore)
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {}

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render()
        }
    }

    public unload(): void {}
}
