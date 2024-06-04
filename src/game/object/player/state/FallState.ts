import { Dinosaur } from '../Dinosaur'
import { gameCore } from '../../../../game-engine/game-core/GameCore'
import { DinosaurState } from './DinosaurState'
import { RunState } from './RunState'

const dinoRun1_Image = new Image()
dinoRun1_Image.src = './assets/images/dino_run1.png'

export class FallState extends DinosaurState {
    constructor(dinosaur: Dinosaur) {
        super(dinosaur)
    }

    public override update(frameTimeDelta: number, gameSpeed: number): void {
        this.dinosaur.getPhysic().update(frameTimeDelta)
        if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
            this.dinosaur
                .getPhysic()
                .velocity.setY(
                    this.dinosaur.getPhysic().velocity.getY() +
                        this.dinosaur.getPhysic().gravity * frameTimeDelta * 2
                )
            this.dinosaur.changeState(new FallState(this.dinosaur))
        }
        if (this.dinosaur.getPos().getY() >= this.dinosaur.getPhysic().land) {
            this.dinosaur.setImage(dinoRun1_Image)
            this.dinosaur.changeState(new RunState(this.dinosaur))
        }
    }
}
