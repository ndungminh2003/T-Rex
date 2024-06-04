import { gameCore } from '../../../../game-engine/game-core/GameCore'
import { DinosaurState } from './DinosaurState'
import { Dinosaur } from '../Dinosaur'
import { RunState } from './RunState'

const standingStillImage = new Image()
standingStillImage.src = './assets/images/standing_still.png'

export class CourchState extends DinosaurState {
    constructor(dinosaur: Dinosaur) {
        super(dinosaur)
    }

    public override update(frameTimeDelta: number, gameSpeed: number): void {
        if (!gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
            this.dinosaur.setImage(standingStillImage)
            this.dinosaur.changeState(new RunState(this.dinosaur))
            this.dinosaur.resetPos()
        }
        this.dinosaur.getAnimation().play('CROUCH', frameTimeDelta, gameSpeed)
        this.dinosaur.resetPos()
    }
}
