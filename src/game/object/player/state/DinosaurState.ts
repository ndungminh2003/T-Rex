import { Dinosaur } from '../Dinosaur'
import { Physic } from '../../../../game-engine/physics/Physic'

export abstract class DinosaurState {
    protected dinosaur: Dinosaur

    constructor(dinosaur: Dinosaur) {
        this.dinosaur = dinosaur
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {}
}
