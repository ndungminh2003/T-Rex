// import { Dinosaur } from './Dinosaur'
// import { gameCore } from '../../../game-engine/game-core/GameCore'
// import { DinosaurManager } from './DinosaurManager'

// const standingStillEyeCloseImage = new Image()
// standingStillEyeCloseImage.src = './assets/images/standing_still_eye_closed.png'

// const duckImage = new Image()
// duckImage.src = './assets/images/crouch_1.png'

// export class RunState extends Dinosaur {
//     constructor(dinosaurManager: DinosaurManager) {
//         super(dinosaurManager)
//     }

//     public override update(frameTimeDelta: number, gameSpeed: number): void {
//         this.animation.play('RUNNING', frameTimeDelta, gameSpeed)
//         if (
//             gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE) ||
//             gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.UP)
//         ) {
//             this.image = standingStillEyeCloseImage
//             this.dinosaurManager.changeState(this.dinosaurManager.jumpState)
//             this.dinosaurManager.getCurrentState().getPhysic().velocity.setY(-2)
//             this.resetPos()
//         } else if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
//             this.image = duckImage
//             this.resetPos()
//             this.dinosaurManager.changeState(this.dinosaurManager.courchState)
//         }
//     }
// }
