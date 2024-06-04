import { Dinosaur } from '../Dinosaur'
import { gameCore } from '../../../../game-engine/game-core/GameCore'
import { DinosaurState } from './DinosaurState'
import { FallState } from './FallState'
import { CourchState } from './CourchState'

const duckImage = new Image()
duckImage.src = './assets/images/crouch_1.png'

export class JumpState extends DinosaurState {
    constructor(dinosaur: Dinosaur) {
        super(dinosaur)
    }

    public override update(frameTimeDelta: number, gameSpeed: number): void {
        if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
            this.dinosaur
                .getPhysic()
                .velocity.setY(
                    this.dinosaur.getPhysic().velocity.getY() +
                        this.dinosaur.getPhysic().gravity * frameTimeDelta * 2
                )
            this.dinosaur.changeState(new FallState(this.dinosaur))
        }
        if (
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN) &&
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE)
        ) {
            this.dinosaur.setImage(duckImage)
            this.dinosaur.resetPos()
            this.dinosaur.changeState(new CourchState(this.dinosaur))
        }
        this.dinosaur.getPhysic().update(frameTimeDelta)
        if (this.dinosaur.getPhysic().velocity.getY() >= 0) {
            this.dinosaur.changeState(new FallState(this.dinosaur))
        }
    }
}
