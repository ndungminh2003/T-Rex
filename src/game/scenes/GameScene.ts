import { Dinosaur } from '../object/player/Dinosaur'
import { Ground } from '../object/map/Ground'
import { Cactus } from '../object/enemy/Cactus'
import { Score } from '../object/map/Score'
import { Bird } from '../object/enemy/Bird'
import { Cloud } from '../object/map/Cloud'
import { getScaleRatio } from '../../game-engine/utilities/Utilities'
import { Scene } from '../../game-engine/scene/Scene'
import { Enemy } from '../object/enemy/Enemy'
import { Vec2D } from '../../game-engine/utilities/Vec2D'
import { gameCore } from '../../game-engine/game-core/GameCore'
import { GAME_STATES } from '../../game-engine/utilities/Config'

export class GameScene extends Scene {
    player: Dinosaur
    ground: Ground
    score: Score
    cloud: Cloud
    enemies: Enemy[] = []
    birds: Bird[] = []
    currentBirdIndex: number = 0
    enemySpawnInterval: number = 2000
    lastEnemySpawnTime: number = 0
    gameSpeed: number

    birdSpawnPositions: Vec2D[] = [new Vec2D(30, 150), new Vec2D(100, 200), new Vec2D(50, 220)]

    constructor() {
        super()
    }

    public load(): void {
        let scaleRatio = getScaleRatio()

        this.player = new Dinosaur(scaleRatio, 1)
        this.ground = new Ground(scaleRatio, 1)
        this.score = new Score(scaleRatio)
        this.cloud = new Cloud(scaleRatio, 1)
        this.birds.push(new Bird(scaleRatio, 1, this.birdSpawnPositions[1], 14))

        this.addGameObject(this.ground)
        this.addGameObject(this.cloud)
        this.addGameObject(this.score)
        this.addGameObject(this.player)

        this.loadBirds(scaleRatio)
        this.loadEnemies()
    }

    private loadBirds(scaleRatio: number): void {
        for (let i = 0; i < this.birdSpawnPositions.length; i++) {
            let bird = new Bird(scaleRatio, 1, this.birdSpawnPositions[i], 14)
            this.birds.push(bird)
        }
    }

    private loadEnemies(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i]
            this.addGameObject(enemy)
        }
    }

    private spawnEnemy(): void {
        let scaleRatio = getScaleRatio()
        let enemy: Enemy

        if (Math.random() > 0.5) {
            enemy = new Cactus(scaleRatio, 1, 13)
            this.enemies.push(enemy)
            this.addGameObject(enemy)
        }
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {
        const currentTime = performance.now()

        if (currentTime - this.lastEnemySpawnTime > this.enemySpawnInterval) {
            this.spawnEnemy()
            this.lastEnemySpawnTime = currentTime
        }

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(frameTimeDelta, gameSpeed)
        }

        this.checkCollisions()
    }

    private checkCollisions(): void {
        for (let enemy of this.enemies) {
            if (enemy.collideWith(this.player)) {
                this.unload()
                gameCore.state = GAME_STATES.GAME_OVER
                break
            }
        }
    }

    public render(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render()
        }
    }

    public unload(): void {
        this.gameObjects = []
        this.enemies = []
        this.currentBirdIndex = 0
    }
}
