import { Component } from '../components/Component'
import { GameObject } from '../components/GameObject'
import { Vec2D } from '../utilities/Vec2D'

export class Collider extends Component {
    private width: number
    private height: number
    private pos: Vec2D

    constructor(gameObject: GameObject) {
        super(gameObject)
        this.width = gameObject.getWidth()
        this.height = gameObject.getHeight()
        this.pos = gameObject.getPos()
        this.name = 'Collider'
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public setWidth(width: number): void {
        this.width = width
    }

    public setHeight(height: number): void {
        this.height = height
    }

    public getPosition(): Vec2D {
        return this.pos
    }

    public setPosition(pos: Vec2D): void {
        this.pos = pos
    }

    public isCollidingWith(other: Collider): boolean {
        const adjustBy = 1.4
        return (
            this.pos.getX() < other.getPosition().getX() + other.getWidth() / adjustBy &&
            this.pos.getX() + this.width / adjustBy > other.getPosition().getX() &&
            this.pos.getY() < other.getPosition().getY() + other.getHeight() / adjustBy &&
            this.pos.getY() + this.height / adjustBy > other.getPosition().getY()
        )
    }

    public update(frameTimeDelta: number, gameSpeed: number): void {}

    public render(frameTimeDelta: number): void {}
}
