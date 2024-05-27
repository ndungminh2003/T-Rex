import { Dinosaur } from '../object/player/Dinosaur'
import { Ground } from '../object/map/Ground'
import { Cactus } from '../object/enemy/Cactus'
import { Score } from '../object/map/Score'
import { Bird } from '../object/enemy/Bird'
import { Cloud } from '../object/map/Cloud'
import { getScaleRatio } from '../../game-engine/utilities/Utilities'
import { gameCore } from '../../game-engine/game-core/GameCore'

import { Scene } from '../../game-engine/scene/Scene'

export class GameScene extends Scene {
    Player: Dinosaur
    Ground: Ground
    Cactus: Cactus
    Score: Score
    Bird: Bird
    Cloud: Cloud

    constructor() {
        super()
    }

    public load(): void {

        let scaleRatio = getScaleRatio()

        this.Player = new Dinosaur(scaleRatio, 1)
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

    public update(frameTimeDelta : number, gameSpeed : number): void {

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
        this.gameObjects = []
    }
}
