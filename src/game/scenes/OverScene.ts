import { Player } from './../object/player/Player';
import { Ground } from './../object/map/Ground';
import { Scene } from "../../game-engine/scene/Scene";
import { getScaleRatio } from "../../game-engine/utilities/Utilities";
import { Score } from '../object/map/Score';
import { Bird } from '../object/enemy/Bird';
import { Cloud } from '../object/map/Cloud';


export class OverScene extends Scene {

  player : Player
  ground : Ground
  score : Score
  bird : Bird
  cloud : Cloud

  public load(): void {

    let scaleRatio = getScaleRatio()

    this.player = new Player(scaleRatio, 1)
    this.ground = new Ground(scaleRatio, 1)
    // this.Cactus = new Cactus()
    this.score = new Score(scaleRatio, 1)
    this.bird = new Bird(scaleRatio, 1)
    this.cloud = new Cloud(scaleRatio, 1)

    this.addGameObject(this.player)
    this.addGameObject(this.ground)

    // this.addGameObject(this.Score)
    this.addGameObject(this.bird)
    this.addGameObject(this.cloud)
  }

  public update(frameTimeDelta: number, gameSpeed: number): void {

    // for (let i = 0; i < this.gameObjects.length; i++) {
    //   this.gameObjects[i].update(frameTimeDelta, gameSpeed)
    // }
  }

  public render(): void {
    // for (let i = 0; i < this.gameObjects.length; i++) {
    //   this.gameObjects[i].render()
    // }
  }

  public unload(): void {
    this.gameObjects = []
  }
  

}
