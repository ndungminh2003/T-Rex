// import { Dinosaur } from './Dinosaur'
// import { DinosaurManager } from './DinosaurManager'
// import { gameCore } from '../../../game-engine/game-core/GameCore'
// import { PLAYER_STATES } from '../../../game-engine/utilities/Config'

// const duckImage = new Image()
// duckImage.src = './assets/images/crouch_1.png'

// export class JumpState extends Dinosaur {
//     constructor(dinosaurManager: DinosaurManager) {
//         super(dinosaurManager)
//     }

//     public override update(frameTimeDelta: number, gameSpeed: number): void {
//         console.log('JumpState')
//         if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
//             // this.physic.velocity.setY(
//             //     this.physic.velocity.getY() + this.physic.gravity * frameTimeDelta * 2
//             // )
//             this.dinosaurManager.changeState(this.dinosaurManager.fallState)
//             this.dinosaurManager
//                 .getCurrentState()
//                 .getPhysic()
//                 .velocity.setY(
//                     this.physic.velocity.getY() + this.physic.gravity * frameTimeDelta * 2
//                 )
//         }
//         if (
//             gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN) &&
//             gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.SPACE)
//         ) {
//             this.image = duckImage
//             this.resetPos()
//             this.dinosaurManager.changeState(this.dinosaurManager.courchState)
//         }

//         this.physic.update(frameTimeDelta)
//         if (this.physic.velocity.getY() >= 0) {
//             this.dinosaurManager.changeState(this.dinosaurManager.fallState)
//         }
//     }
// }
