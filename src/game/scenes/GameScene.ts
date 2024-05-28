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
import { OverScene } from './OverScene'

export class GameScene extends Scene {
    player: Dinosaur
    ground: Ground
    score: Score
    cloud: Cloud
    enemies: Enemy[] = []
    birds: Bird[] = []
    currentBirdIndex: number = 0
    enemySpawnInterval: number = 4000
    lastEnemySpawnTime: number = 0

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

        this.enemies = this.enemies.filter((e) => !(e instanceof Bird))

        if (Math.random() > 0.5) {
            enemy = new Cactus(scaleRatio, 1, 13)
        } else {
            enemy = this.birds[this.currentBirdIndex]
            this.currentBirdIndex = (this.currentBirdIndex + 1) % this.birds.length
        }

        this.enemies.push(enemy)
        this.addGameObject(enemy)
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

        this.checkBirdPosition()
        this.checkCollisions()
    }

    private checkBirdPosition(): void {
        const groundEndPosition = 800

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i]
            if (enemy instanceof Bird && enemy.getPos().getX() > groundEndPosition) {
                this.removeGameObject(enemy)
                this.enemies.splice(i, 1)
                this.spawnEnemy()
                break
            }
        }
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

    private removeGameObject(gameObject: any): void {
        const index = this.gameObjects.indexOf(gameObject)
        if (index > -1) {
            this.gameObjects.splice(index, 1)
        }
    }
}
