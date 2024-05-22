export class Cactus {
  ctx: any
  width: number
  height: number
  scaleRatio: number
  x: number
  y: number

  cactusImage: HTMLImageElement
  image: HTMLImageElement

  constructor(ctx: any, width: number, height: number, scaleRatio: number){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.scaleRatio = scaleRatio;
    
    this.x = 49;
    this.y = 230; 

    this.cactusImage = new Image()
    this.cactusImage.src = './assets/images/cactus_1.png'
    this.image = this.cactusImage

  }

  update(){
    this.x -= 5 
  }

  render() {
    
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    if(this.x <= -this.width ) {
      this.x = this.width + window.innerWidth;
    }
  }

  collideWith(player : any){

    if(player.x <= this.x && player.y === this.y){
      
      return true;
    }
    else {
      
      return false;
    }

  }


}