// import { GameObject } from '../../../game-engine/components/GameObject'
// import { CourchState } from './CourchState'
// import { Dinosaur } from './Dinosaur'
// import { FallState } from './FallState'
// import { JumpState } from './JumpState'
// import { RunState } from './RunState'

// const standingStillImage = new Image()
// standingStillImage.src = './assets/images/standing_still.png'

// const dinoRun1_Image = new Image()
// dinoRun1_Image.src = './assets/images/dino_run1.png'

// const dinoRun2_Image = new Image()
// dinoRun2_Image.src = './assets/images/dino_run2.png'

// const duckImage = new Image()
// duckImage.src = './assets/images/crouch_1.png'

// const duck2Image = new Image()
// duck2Image.src = './assets/images/crouch_2.png'

// const standingStillEyeCloseImage = new Image()
// standingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

// export class DinosaurManager extends GameObject {
//     private dinosaurSate: Dinosaur
//     public runState: RunState
//     public jumpState: JumpState
//     public fallState: FallState
//     public courchState: CourchState

//     constructor() {
//         super()
//         this.runState = new RunState(this)
//         this.jumpState = new JumpState(this)
//         this.fallState = new FallState(this)
//         this.courchState = new CourchState(this)
//         this.dinosaurSate = this.runState
//     }

//     public changeState(dinosaurState: Dinosaur): void {
//         this.dinosaurSate = dinosaurState
//     }

//     public getCurrentState(): Dinosaur {
//         return this.dinosaurSate
//     }

//     public update(frameTimeDelta: number, gameSpeed: number) {
//         this.getCurrentState().update(frameTimeDelta, gameSpeed)
//     }

//     public render() {
//         this.getCurrentState().render()
//     }
// }
