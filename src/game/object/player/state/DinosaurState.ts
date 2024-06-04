import { Dinosaur } from '../Dinosaur'

export abstract class DinosaurState {
    protected dinosaur: Dinosaur

    constructor(dinosaur: Dinosaur) {
        this.dinosaur = dinosaur
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {}
}
