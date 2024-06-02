import { Dinosaur } from '../object/player/Dinosaur'
import { Ground } from './../object/map/Ground'
import { Scene } from '../../game-engine/scene/Scene'

import { Cloud } from '../object/map/Cloud'

export class ReadyScene extends Scene {
    player: Dinosaur
    ground: Ground
    cloud: Cloud

    public load(): void {
        this.player = new Dinosaur()
        this.ground = new Ground()
        this.cloud = new Cloud()

        this.addGameObject(this.player)
        this.addGameObject(this.ground)
        this.addGameObject(this.cloud)
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {}

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render()
        }
    }

    public unload(): void {
        this.gameObjects = []
    }
}
