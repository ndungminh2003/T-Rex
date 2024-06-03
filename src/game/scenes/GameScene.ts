import { canvas } from './../../game-engine/utilities/Config'
import { Dinosaur } from '../object/player/Dinosaur'
import { Ground } from '../object/map/Ground'
import { Score } from '../object/map/Score'
import { Cloud } from '../object/map/Cloud'
import { Scene } from '../../game-engine/scene/Scene'
import { Vec2D } from '../../game-engine/utilities/Vec2D'
import { Number } from '../object/text/Number'
import { HighScore } from '../object/text/HighScore'

export class GameScene extends Scene {
    public player: Dinosaur
    public ground: Ground
    public score: Number
    public cloud: Cloud
    public cloud1: Cloud
    public cloud2: Cloud
    public highScore: HighScore

    constructor() {
        super()
    }

    public load(): void {
        this.player = new Dinosaur()
        this.ground = new Ground()
        this.score = new Number(new Vec2D(canvas.width - 150, 50), 5)
        this.cloud = new Cloud(new Vec2D(canvas.width - 50, 100))
        this.cloud1 = new Cloud(new Vec2D(canvas.width - 250, 130))
        this.cloud2 = new Cloud(new Vec2D(canvas.width - 120, 200))
        this.highScore = new HighScore(new Vec2D(canvas.width - 400, 50))

        this.addGameObject(this.highScore)
        this.addGameObject(this.ground)
        this.addGameObject(this.cloud)
        this.addGameObject(this.cloud1)
        this.addGameObject(this.cloud2)
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
