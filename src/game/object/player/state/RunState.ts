import { Dinosaur } from '../Dinosaur'
import { gameCore } from '../../../../game-engine/game-core/GameCore'
import { DinosaurState } from './DinosaurState'
import { JumpState } from './JumpState'
import { CourchState } from './CourchState'

const standingStillEyeCloseImage = new Image()
standingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

const duckImage = new Image()
duckImage.src = './assets/images/crouch_1.png'

export class RunState extends DinosaurState {
    constructor(dinosaur: Dinosaur) {
        super(dinosaur)
    }

    public override update(frameTimeDelta: number, gameSpeed: number): void {
        this.dinosaur.getAnimation().play('RUNNING', frameTimeDelta, gameSpeed)
        if (
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
        ) {
            this.dinosaur.setImage(standingStillEyeCloseImage)
            this.dinosaur.changeState(new JumpState(this.dinosaur))
            this.dinosaur.getPhysic().velocity.setY(-1.2)
        } else if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
            this.dinosaur.setImage(duckImage)
            this.dinosaur.changeState(new CourchState(this.dinosaur))
            this.dinosaur.resetPos()
        }
        this.dinosaur.resetPos()
    }
}
