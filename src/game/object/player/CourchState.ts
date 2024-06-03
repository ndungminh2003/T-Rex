// import { Dinosaur } from './Dinosaur'
// import { DinosaurManager } from './DinosaurManager'
// import { gameCore } from '../../../game-engine/game-core/GameCore'
// import { PLAYER_STATES } from '../../../game-engine/utilities/Config'

// const standingStillImage = new Image()
// standingStillImage.src = './assets/images/standing_still.png'

// export class CourchState extends Dinosaur {
//     constructor(dinosaurManager: DinosaurManager) {
//         super(dinosaurManager)
//     }

//     public override update(frameTimeDelta: number, gameSpeed: number): void {
//         console.log('CourchState')
//         if (!gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
//             this.image = standingStillImage
//             this.dinosaurManager.changeState(this.dinosaurManager.runState)
//             this.resetPos()
//         }
//         this.animation.play('CROUCH', frameTimeDelta, gameSpeed)
//         this.resetPos()
//     }
// }
