import { PLAYER_STATES } from './../../../game-engine/utilities/Config'
import { Dinosaur } from './Dinosaur'
import { DinosaurRun } from './DinosaurRun'

const standingStillImage = new Image()
standingStillImage.src = './assets/images/standing_still.png'

const dinoRun1_Image = new Image()
dinoRun1_Image.src = './assets/images/dino_run1.png'

const dinoRun2_Image = new Image()
dinoRun2_Image.src = './assets/images/dino_run2.png'

const duckImage = new Image()
duckImage.src = './assets/images/crouch_1.png'

const duck2Image = new Image()
duck2Image.src = './assets/images/crouch_2.png'

const standingStillEyeCloseImage = new Image()
standingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

export class DinosaurController {
    private dinosaur: Dinosaur
    private state: string

    constructor() {
        this.state = PLAYER_STATES.RUNNING
        this.dinosaur = new DinosaurRun()
    }

    public changeState(dinosaurState: Dinosaur): void {
        this.dinosaur = dinosaurState
    }

    public getCurrentState(): Dinosaur {
        return this.dinosaur
    }

    public update(frameTimeDelta: number, gameSpeed: number) {
        switch (this.state) {
            case PLAYER_STATES.RUNNING:

                break

            case PLAYER_STATES.JUMPING:
                break

            case PLAYER_STATES.FALLING:
                break

            case PLAYER_STATES.CROUCH:
                break
        }

        this.getCurrentState().update(frameTimeDelta, gameSpeed)
    }

    public render() {
        this.getCurrentState().render()
    }
}
