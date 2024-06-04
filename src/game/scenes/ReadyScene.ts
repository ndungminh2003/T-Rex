import { Dinosaur } from './../object/player/Dinosaur'
// import { DinosaurManager } from '../object/player/DinosaurManager'
import { Ground } from './../object/map/Ground'
import { Scene } from '../../game-engine/scene/Scene'
import { Cloud } from '../object/map/Cloud'
import { canvas } from '../../game-engine/utilities/Config'
import { Vec2D } from '../../game-engine/utilities/Vec2D'
import { Score } from '../object/map/Score'
import { Number } from '../object/text/Number'
import { HighScore } from '../object/text/HighScore'
import { Sun } from '../object/map/Sun'

export class ReadyScene extends Scene {
    public sun: Sun
    public player: Dinosaur
    public ground: Ground
    public score: Number
    public highScore: HighScore
    public cloud: Cloud
    public cloud1: Cloud
    public cloud2: Cloud
    public cloud3: Cloud

    public load(): void {

        this.ground = new Ground(new Vec2D(0, 0))
        this.player = new Dinosaur()
        this.score = new Number(new Vec2D(canvas.width - 150, 50), 5)
        this.highScore = new HighScore(new Vec2D(canvas.width - 400, 50))
        this.cloud = new Cloud(new Vec2D(canvas.width - 900, 100), new Vec2D(-0.8, 0))
        this.cloud3 = new Cloud(new Vec2D(canvas.width - 200, 130), new Vec2D(-0.6, 0))
        this.cloud1 = new Cloud(new Vec2D(canvas.width - 1200, 180), new Vec2D(-0.4, 0))
        this.cloud2 = new Cloud(new Vec2D(canvas.width - 500, 220), new Vec2D(-0.1, 0))
        this.sun = new Sun(new Vec2D(canvas.width - 700, 80), new Vec2D(-2, 0))

        this.addGameObject(this.sun)
        this.addGameObject(this.player)
        this.addGameObject(this.ground)
        this.addGameObject(this.cloud)
        this.addGameObject(this.cloud1)
        this.addGameObject(this.cloud2)
        this.addGameObject(this.cloud3)
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
