import { canvas } from './../../game-engine/utilities/Config'
import { Dinosaur } from '../object/player/Dinosaur'
import { Ground } from '../object/map/Ground'
import { Cloud } from '../object/map/Cloud'
import { Scene } from '../../game-engine/scene/Scene'
import { Vec2D } from '../../game-engine/utilities/Vec2D'
import { Number } from '../object/text/Number'
import { HighScore } from '../object/text/HighScore'
import { Sun } from '../object/map/Sun'

export class GameScene extends Scene {
    public sun: Sun
    public player: Dinosaur
    public ground: Ground
    public ground1: Ground
    public score: Number
    public cloud: Cloud
    public cloud1: Cloud
    public cloud2: Cloud
    public cloud3: Cloud
    public highScore: HighScore

    constructor() {
        super()
    }

    public load(): void {

        this.player = new Dinosaur()
        this.ground = new Ground(new Vec2D(0, 0))
        this.ground1 = new Ground(new Vec2D(2400, 0))
        this.score = new Number(new Vec2D(canvas.width - 150, 50), 5)
        this.cloud = new Cloud(new Vec2D(canvas.width - 900, 100), new Vec2D(-0.8, 0))
        this.cloud3 = new Cloud(new Vec2D(canvas.width - 200, 130), new Vec2D(-0.9, 0))
        this.cloud1 = new Cloud(new Vec2D(canvas.width - 1200, 180), new Vec2D(-0.6, 0))
        this.cloud2 = new Cloud(new Vec2D(canvas.width - 500, 220), new Vec2D(-0.3, 0))
        this.sun = new Sun(new Vec2D(canvas.width - 700, 80), new Vec2D(-3, 0))
        this.highScore = new HighScore(new Vec2D(canvas.width - 400, 50))

        this.addGameObject(this.sun)
        this.addGameObject(this.highScore)
        this.addGameObject(this.ground)
        this.addGameObject(this.ground1)
        this.addGameObject(this.cloud)
        this.addGameObject(this.cloud1)
        this.addGameObject(this.cloud2)
        this.addGameObject(this.cloud3)
        this.addGameObject(this.score)
        this.addGameObject(this.player)
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(frameTimeDelta, gameSpeed)
        }
    }

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render()
        }
    }

    public unload(): void {
        // this.gameObjects = []
    }
}
