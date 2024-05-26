import { Object } from './Object'
import { Vec2D } from '../utilities/Vec2D'
import { Component } from './Component'

export abstract class GameObject extends Object {
    protected width: number
    protected height: number
    protected position: Vec2D
    protected components: Component[] = []
    protected depth: number

    constructor(pos = new Vec2D(0, 0), depth = 0) {
        super()
        this.position = pos
        this.depth = depth
    }

    getPos(): Vec2D {
        return this.position
    }

    setPos(pos: Vec2D): void {
        this.position = pos
    }

    getWidth(): number {
        return this.width
    }

    getHeight(): number {
        return this.height
    }

    setWidth(width: number): void {
        this.width = width
    }

    setHeight(height: number): void {
        this.height = height
    }

    getDepth(): number {
        return this.depth
    }

    setDepth(depth: number): void {
        this.depth = depth
    }

    setToggleActive(active: boolean): void {
        if (active && !this.isEnabled) {
            for (let component of this.components) {
                component.setToggleActive(true)
            }
            this.isEnabled = true
        } else if (!active && this.isEnabled) {
            for (let component of this.components) {
                component.setToggleActive(false)
            }
            this.isEnabled = false
        }
    }

    addComponent(component: Component): void {
        this.components.push(component)
    }

    getComponent(name: string): Component | undefined {
        for (let component of this.components) {
            if (component.getName() === name) {
                return component
            }
        }
        return undefined
    }


    abstract update(gameSpeed: number, frameTimeDelta: number): void
    abstract render(): void
}
