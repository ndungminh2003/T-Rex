import { Collider } from '../../../game-engine/physics/Collider'
import { Sprite } from '../../../game-engine/sprite/Sprite'

import { IEnemy } from '../../../types/IEnemy'

export abstract class Enemy extends Sprite implements IEnemy {
    protected collider: Collider

    constructor() {
        super()

        this.collider = new Collider(this)
    }

    update(frameTimeDelta: number, gameSpeed: number) {
        this.position.setX(this.position.getX() - gameSpeed * frameTimeDelta)
    }
}
