import { gameCore } from './game-engine/game-core/GameCore';
import { GAME_STATES } from './game-engine/utilities/Config';
import { GameCore } from './game-engine/game-core/GameCore';


export class GameManager {

  public gameCore : GameCore

  constructor(){
    this.gameCore = gameCore
  }

  public update() {

    switch (this.gameCore.state) {
      case GAME_STATES.READY:
        this.gameCore.update(0, 0)
        break
      case GAME_STATES.RUNNING:
        this.gameCore.update(0, 0.6)
        break
      case GAME_STATES.GAME_OVER:
        this.gameCore.update(0, 0)
        break
    }

  }






}