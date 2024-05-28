import { Dinosaur } from '../object/player/Dinosaur';
import { Ground } from './../object/map/Ground';
import { Scene } from '../../game-engine/scene/Scene';
import { getScaleRatio } from '../../game-engine/utilities/Utilities';
import { Score } from '../object/map/Score';
import { Bird } from '../object/enemy/Bird';
import { Cloud } from '../object/map/Cloud';
import { ctx } from '../../game-engine/utilities/Config';
import { Vec2D } from '../../game-engine/utilities/Vec2D';


const replayImage = new Image()
replayImage.src = './assets/images/replay.png'

export class OverScene extends Scene {
    player: Dinosaur;
    ground: Ground;
    score: Score;
    bird: Bird;
    cloud: Cloud;
    gameOverText: string;
    
    public load(): void {
        let scaleRatio = getScaleRatio();

        this.player = new Dinosaur(scaleRatio, 1);
        this.ground = new Ground(scaleRatio, 1);
        this.score = new Score(scaleRatio);
        // this.bird = new Bird(scaleRatio, 1, new Vec2D(30, 150), 13);
        this.cloud = new Cloud(scaleRatio, 1);

        this.addGameObject(this.player);
        this.addGameObject(this.ground);
        this.addGameObject(this.score);
        // this.addGameObject(this.bird);
        this.addGameObject(this.cloud);

        this.gameOverText = "GAME OVER!";
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {
        
    }

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render();
        }

        this.renderGameOverText();
    }

    private renderGameOverText(): void {
    
        ctx.font = '48px serif';
        ctx.fillStyle = 'grey';
        ctx.textAlign = 'center';
        ctx.fillText(this.gameOverText, window.innerWidth / 2, window.innerHeight / 3);
        ctx.drawImage(replayImage, window.innerWidth / 2 - 28, window.innerHeight / 3 + 20)
        
    }

    public unload(): void {
        this.gameObjects = [];
    }


}
