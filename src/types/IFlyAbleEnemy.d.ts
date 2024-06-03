import { IEnemy } from './IEnemy'

export interface IFlyAbleEnemy extends IEnemy {
    fly(frameTimeDelta, gameSpeed): void
}
