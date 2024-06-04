import { Enemy } from './Enemy'
import { Bird } from './Bird'
import { Cactus } from './Cactus'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { canvas } from '../../../game-engine/utilities/Config'

export class EnemyManager {
    private static instance: EnemyManager
    public enemies: Enemy[]
    private maxEnemies: number
    private currentEnemies: number

    private constructor() {
        this.enemies = []
        this.maxEnemies = 7
        this.currentEnemies = 0
    }

    public static getInstance(): EnemyManager {
        if (!EnemyManager.instance) {
            EnemyManager.instance = new EnemyManager()
        }
        return EnemyManager.instance
    }

    public generateEnemy(gameSpeed: number): void {

        if (this.currentEnemies >= this.maxEnemies) {
            this.enemies.shift()
            this.currentEnemies--
        }

        // create bird
        let y = Math.random() * 600 
        while (y <= 150 || y >= 520) {
            y = Math.random() * 600
        }

        const birdPosition = new Vec2D(canvas.width, y)
        const bird = new Bird(birdPosition, gameSpeed)
        this.enemies.push(bird)
        this.currentEnemies++
        
        // create cactus
        if (!this.enemies.some((enemy) => enemy instanceof Cactus)) {
            const cactus = new Cactus(gameSpeed)
            this.enemies.push(cactus)
            this.currentEnemies++
        }
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i]
            enemy.update(frameTimeDelta, gameSpeed)

            if (enemy.getPos().getX() < -enemy.getWidth()) {
                this.removeEnemy(enemy)
                i--
            }
        }
    }

    public clearEnemies(): void {
        this.enemies = []
        this.currentEnemies = 0
    }

    public removeEnemy(enemy: Enemy): void {
        const enemyIndex = this.enemies.indexOf(enemy)
        if (enemyIndex > -1) {
            this.enemies.splice(enemyIndex, 1)
            this.currentEnemies--
        }
    }

    public render(): void {
        for (const enemy of this.enemies) {
            enemy.render()
        }
    }
}

export const enemyManager = EnemyManager.getInstance()
