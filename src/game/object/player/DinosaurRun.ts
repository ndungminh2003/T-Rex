import { Dinosaur } from './Dinosaur'
import { gameCore } from '../../../game-engine/game-core/GameCore'
import { PLAYER_STATES } from '../../../game-engine/utilities/Config'
import { DinosaurController } from './DinosaurController'


const standingStillEyeCloseImage = new Image()
standingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

const duckImage = new Image()
duckImage.src = './assets/images/crouch_1.png'


export class DinosaurRun extends Dinosaur {
    
    constructor() {
        super()
    }

    override update(frameTimeDelta: number, gameSpeed: number): void {
        if (
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
            gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
        ) {
            this.image = standingStillEyeCloseImage
            this.state = PLAYER_STATES.JUMPING
        } else if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
            this.image = duckImage
            this.state = PLAYER_STATES.CROUCH
            this.resetPos()
        }
        this.animation.play('RUNNING', frameTimeDelta, gameSpeed)
        this.resetPos()
    }
    
}
