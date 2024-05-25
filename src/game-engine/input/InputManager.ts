import { KEY_CODE } from '../utilities/KeyCode'

export class InputManager {
    private static instance: InputManager
    private readonly keyCode: { [key: string]: number }
    private keyEvent: { [key: string]: { [key: string]: boolean } }

    constructor() {
        this.keyCode = KEY_CODE
        this.keyEvent = {
            keyDown: {},
            keyUp: {},
        }
    }

    // Singleton pattern
    public static getInstacne(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager()
        }
        return InputManager.instance
    }

    public start(): void {
        window.addEventListener('keydown', this.handleKeyDown)
        window.addEventListener('keyup', this.handleKeyUp)
    }

    private hasKeyDown(keyCode: string): boolean {
        if (this.keyEvent.keyDown[keyCode] === true) {
            return true
        }
        return false
    }

    private hasKeyUp(keyCode: string): boolean {
        if (this.keyEvent.keyUp[keyCode] === true) {
            return true
        }
        return false
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (!this.hasKeyDown(event.code)) {
            this.keyEvent.keyDown[event.code] = true
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        this.keyEvent.KeyUp[event.code] = true
        delete this.keyEvent.KeyDown[event.code]
    }

}
