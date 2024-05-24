import { GameScene } from './scenes/GameScene';
import { gameConfig } from './utilities/Config';


class Game {
    constructor() {
        new GameScene (gameConfig)
    }
}

new Game()
