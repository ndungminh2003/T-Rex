import { Component } from '../components/Component'
import { GameObject } from '../components/GameObject'
import { Vec2D } from '../utilities/Vec2D'

export class Physic extends Component {
    public gravity: number
    public velocity: Vec2D
    public land: number

    constructor(gameObject: GameObject, scaleRatio: number) {
        super(gameObject)

        this.gravity = 10 * scaleRatio
        this.velocity = new Vec2D(0, -this.gravity)
        this.land = this.canvas.height - this.gameObject.getHeight() - 1.5 * scaleRatio
        this.name = 'Physic'
    }

    public update(frameTimeDelta: number): void {
        this.velocity = Vec2D.add(this.velocity, new Vec2D(0, this.gravity / frameTimeDelta))

        this.gameObject.setPos(
            Vec2D.add(
                this.gameObject.getPos(),
                Vec2D.mul(this.velocity, this.gravity / frameTimeDelta)
            )
        )
        if (this.gameObject.getPos().getY() >= this.land) {
            this.gameObject.getPos().setY(this.land)

            this.velocity = new Vec2D(0, -this.gravity)
        }
    }

    public render(frameTimeDelta: number): void {
        return
    }
}
