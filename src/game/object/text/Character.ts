import { Vec2D } from './../../../game-engine/utilities/Vec2D'
import { Sprite } from '../../../game-engine/sprite/Sprite'
import { ctx } from '../../../game-engine/utilities/Config'

export class Character extends Sprite {
    character: string

    constructor(pos: Vec2D, character: string) {
        super()
        this.character = character
        this.position = pos
        this.image = new Image()
        this.image.src = `./assets/images/${this.character}_character.png`
    }

    public setCharacter(character: string) {
        this.character = character
        this.image.src = `./assets/images/${this.character}_character.png`
    }

    update(gameSpeed: number, frameTimeDelta: number) {
        throw new Error('Method not implemented.')
    }

}
