// import { Dinosaur } from './Dinosaur'
// import { DinosaurManager } from './DinosaurManager'
// import { gameCore } from '../../../game-engine/game-core/GameCore'
// import { PLAYER_STATES } from '../../../game-engine/utilities/Config'

// const dinoRun1_Image = new Image()
// dinoRun1_Image.src = './assets/images/dino_run1.png'

// export class FallState extends Dinosaur {
//     constructor(dinosaurManager: DinosaurManager) {
//         super(dinosaurManager)
//     }

//     public override update(frameTimeDelta: number, gameSpeed: number): void {
//         console.log('FallState')
//         this.physic.update(frameTimeDelta)
//         if (gameCore.inputManager.hasKeyDown(gameCore.inputManager.keyCode.DOWN)) {
//             // this.physic.velocity.setY(
//             //     this.physic.velocity.getY() + this.physic.gravity * frameTimeDelta * 2
//             // )
//             this.dinosaurManager.changeState(this.dinosaurManager.fallState)
//             this.dinosaurManager.getCurrentState().getPhysic().velocity.setY(
//                 this.physic.velocity.getY() + this.physic.gravity * frameTimeDelta * 2
//             )
//         }
//         if (this.position.getY() >= this.physic.land) {
//             this.image = dinoRun1_Image
//             this.dinosaurManager.changeState(this.dinosaurManager.runState)
//         }
//     }
// }
