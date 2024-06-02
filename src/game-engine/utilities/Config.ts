import { Canvas } from '../canvas/Canvas'
import { Vec2D } from './Vec2D'

export const GAME_WIDTH = 1400
export const GAME_HEIGHT = 600

const myCanvas = Canvas.getInstance()
export const canvas: HTMLCanvasElement = myCanvas.init(GAME_HEIGHT, GAME_WIDTH)
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')

export const GAME_STATES = {
    READY: 1,
    RUNNING: 2,
    GAME_OVER: 3,
}

export const PLAYER_STATES = {
    RUNNING: 'running',
    JUMPING: 'jumping',
    FALLING: 'falling',
    CROUCH: 'crouch',
}

export const GROUND_POSITION = new Vec2D(0, canvas.height - 1050)
