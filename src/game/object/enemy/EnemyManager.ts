import { Enemy } from './Enemy'
import { Bird } from './Bird'
import { Cactus } from './Cactus'
import { Vec2D } from '../../../game-engine/utilities/Vec2D'
import { canvas } from '../../../game-engine/utilities/Config'

export class EnemyManager {
    private static instance: EnemyManager
    public enemies: Enemy[]
    private maxEnemies: number // Số lượng tối đa vật cản được duy trì
    private currentEnemies: number // Số lượng vật cản hiện tại

    private constructor() {
        this.enemies = []
        this.maxEnemies = 3 // Số lượng tối đa vật cản được duy trì
        this.currentEnemies = 0 // Khởi tạo biến đếm số lượng vật cản hiện tại
    }

    public static getInstance(): EnemyManager {
        if (!EnemyManager.instance) {
            EnemyManager.instance = new EnemyManager()
        }
        return EnemyManager.instance
    }

    public generateEnemy(gameSpeed: number): void {
        if (this.currentEnemies >= this.maxEnemies) {
            // Nếu đã đạt tới số lượng tối đa, xóa vật cản đầu tiên và thêm vật cản mới vào cuối
            this.enemies.shift()
            this.currentEnemies--
        }

        // Tạo con chim ở vị trí ngẫu nhiên
        const birdPosition = new Vec2D(canvas.width, Math.random() * 400)
        const bird = new Bird(birdPosition, gameSpeed)
        this.enemies.push(bird)
        this.currentEnemies++

        // Nếu chưa tạo cây xương rồng, tạo cây xương rồng ở vị trí cố định
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
        this.currentEnemies = 0 // Đặt lại biến đếm khi xóa tất cả vật cản
    }

    public removeEnemy(enemy: Enemy): void {
        const enemyIndex = this.enemies.indexOf(enemy)
        if (enemyIndex > -1) {
            this.enemies.splice(enemyIndex, 1)
            this.currentEnemies-- // Giảm biến đếm khi xóa một vật cản
        }
    }

    public render(): void {
        for (const enemy of this.enemies) {
            enemy.render()
        }
    }
}

export const enemyManager = EnemyManager.getInstance()
