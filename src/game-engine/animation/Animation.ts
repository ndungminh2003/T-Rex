import { Component } from '../components/Component'
import { GameObject } from '../components/GameObject'
import { Sprite } from '../sprite/Sprite'

export class Animation extends Component {

  private animationNameRunning: string
  private animationFrame: { [key: string]: HTMLImageElement[] }
  private animatiomTimer : number
  private sprite : Sprite

  constructor(gameObject: GameObject) {
    super(gameObject)
        this.name = 'Animation'
        this.animatiomTimer = 200
        
        
    }

    public getAnimationName(): string {
      return this.animationNameRunning
    }
    

    public addAnimationFrame(animationName: string, frame: HTMLImageElement): void {
      this.animationFrame[animationName].push(frame)
    }
    
    public play(animationName : string){
      if(animationName != this.animationNameRunning){
        this.animationNameRunning = animationName
      }
      
     
    }


    
    public update(frameTimeDelta: number, gameSpeed : number): void {
      
      // const len = this.animationFrame[this.animationNameRunning].length
      
      // if (this.animatiomTimer <= 0) {
      //   if (this.gameObject.getImage() === dinoRun1_Image) {
      //   this.image = dinoRun2_Image
      //   } else {
      //     this.image = dinoRun1_Image
      //   }
      //   this.walkAnimationTimer = 200
      // }
      
      // // this.walkAnimationTimer -= frameTimeDelta * gameSpeed
      
    }

    public render(frameTimeDelta: number): void {}
}
