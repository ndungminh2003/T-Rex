import { Player } from '../object/player/Player'
import { Ground } from '../object/map/Ground'
import { Cactus } from '../object/enemy/Cactus'
import { Score } from '../object/map/Score'
import { Bird } from '../object/enemy/Bird'
import { Cloud } from '../object/map/Cloud'
import { getScaleRatio } from '../../game-engine/utilities/Utilities'

import { Scene } from '../../game-engine/scene/Scene'

export class GameScene extends Scene {
    Player: Player
    Ground: Ground
    Cactus: Cactus
    Score: Score
    Bird: Bird
    Cloud: Cloud

    constructor(frameTimeDelta: number, gameSpeed: number) {
        super(frameTimeDelta, gameSpeed)
    }

    public load(): void {

        let scaleRatio = getScaleRatio()

        this.Player = new Player(scaleRatio, 1)
        this.Ground = new Ground(scaleRatio, 1)
        // this.Cactus = new Cactus()
        this.Score = new Score(scaleRatio, 1)
        this.Bird = new Bird(scaleRatio, 1)
        this.Cloud = new Cloud(scaleRatio, 1)

        this.addGameObject(this.Player)
        this.addGameObject(this.Ground)

        // this.addGameObject(this.Score)
        this.addGameObject(this.Bird)
        this.addGameObject(this.Cloud)
    }

    public update(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(this.frameTimeDelta, this.gameSpeed)
        }
    }

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render()
        }
    }

    public unload(): void {
        this.gameObjects = []
    }
}
