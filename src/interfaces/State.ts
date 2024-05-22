import { GameState } from "../scenes/GameState";


export interface State {

  game : GameState
  click() : void
  type() : void

}