export class Canvas {
    private static instance: Canvas
    private canvas: HTMLCanvasElement

    constructor() {
        this.canvas = document.getElementById('id') as HTMLCanvasElement
    }

    // singleton pattern
    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas()
        }
        return Canvas.instance
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas
    }

    public getWidth(): number {
        return this.canvas.width
    }

    public getHeight(): number {
        return this.canvas.height
    }

    public init(h: number, w: number): HTMLCanvasElement {
        this.canvas.height = h
        this.canvas.width = w
        return this.canvas
    }
}
