import { Object } from './Object'
import { GameCore } from '../game-core/GameCore'
import { GameObject } from './GameObject'

export abstract class Component extends Object {

  protected name : string
  protected gameObject : GameObject
  protected gameCore : GameCore

  constructor(gameObject : GameObject) {
    super()
    this.gameObject = gameObject
    this.gameObject.addComponent(this)
  }

  public getName() : string {
    return this.name
  }

  public setName(name : string) : void {
    this.name = name
  }

  public abstract update(frameTimeDelta : number) : void
  public abstract render(frameTimeDelta : number) : void

  
}
