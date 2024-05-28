import { Dinosaur } from '../object/player/Dinosaur';
import { Ground } from './../object/map/Ground';
import { Scene } from '../../game-engine/scene/Scene';
import { getScaleRatio } from '../../game-engine/utilities/Utilities';
import { Cloud } from '../object/map/Cloud';

export class ReadyScene extends Scene {
    player: Dinosaur;
    ground: Ground;
    cloud: Cloud;

    public load(): void {
        let scaleRatio = getScaleRatio();

        this.player = new Dinosaur(scaleRatio, 1);
        this.ground = new Ground(scaleRatio, 1);
        this.cloud = new Cloud(scaleRatio, 1);

        this.addGameObject(this.player);
        this.addGameObject(this.ground);
        this.addGameObject(this.cloud);
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {
        
    }

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render();
        }
    }

    public unload(): void {
        this.gameObjects = [];
    }
}
