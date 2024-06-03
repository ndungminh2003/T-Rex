import e from 'express'
import { KEY_CODE } from '../utilities/KeyCode'

export class InputManager {
    private static instance: InputManager
    public readonly keyCode: { [key: string]: number }
    public keyEvent: { [key: string]: { [key: string]: boolean } }

    constructor() {
        this.keyCode = KEY_CODE
        this.keyEvent = {
            keyDown: {},
            keyUp: {},
        }

        // Bind the methods to the instance
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    // Singleton pattern
    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager()
        }
        return InputManager.instance
    }

    public start(): void {
        window.addEventListener('keydown', this.handleKeyDown)
        window.addEventListener('keyup', this.handleKeyUp)
    }

    hasKeyDown(keyCode: number): boolean {
        return this.keyEvent.keyDown[keyCode] === true
    }

    hasKeyUp(keyCode: number): boolean {
        return this.keyEvent.keyUp[keyCode] === true
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (!this.hasKeyDown(event.which)) {
            this.keyEvent.keyDown[event.which] = true
        }
    }

    handleKeyUp(event: KeyboardEvent): void {
        this.keyEvent.keyUp[event.which] = true
        delete this.keyEvent.keyDown[event.which]
    }
}
