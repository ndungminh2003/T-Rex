export class Canvas {
    private static instance: Canvas
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor() {
        this.canvas = document.getElementById('game') as HTMLCanvasElement
    }

    // singleton pattern
    public static getInstance(): Canvas {
        if (!Canvas.instance) {
            Canvas.instance = new Canvas()
        }
        return Canvas.instance
    }

    public getContext(): CanvasRenderingContext2D {
        return this.ctx
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

    public init(w: number, h: number): HTMLCanvasElement {
        this.canvas.width = w
        this.canvas.height = h
        return this.canvas
    }
}
