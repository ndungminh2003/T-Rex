import { Canvas } from '../canvas/Canvas'

export const GAME_WIDTH = 1400
export const GAME_HEIGHT = 600

const myCanvas = Canvas.getInstance()
export const canvas: HTMLCanvasElement = myCanvas.init(GAME_HEIGHT, GAME_WIDTH)
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')

