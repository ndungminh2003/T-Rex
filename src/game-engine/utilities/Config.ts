import { Canvas } from '../canvas/Canvas'
import { getScaleRatio } from './Utilities'
import { Vec2D } from './Vec2D'

export var gameConfig = {
    game: {
        GAME_WIDTH: 800,
        GAME_HEIGHT: 300,
        GAME_SPEED: 1,
        GAME_SPEED_INCREMENT: 0.00001,
        GROUND_AND_CACTUS_SPEED: 0.5,
    },

    player: {
        PLAYER_WIDTH: 58,
        PLAYER_HEIGHT: 62,
        JUMP_HEIGHT: 200,
        JUMP_SPEED: 0.6,
        GRAVITY: 0.4,
    },

    ground: {
        GROUND_WIDTH: 2400,
        GROUND_HEIGHT: 24,
    },

    cactus: {
        CACTUS_WIDTH: 45,
        CACTUS_HEIGHT: 30,
    },
}

const scaleRatio = getScaleRatio()

export const GAME_WIDTH = 810
export const GAME_HEIGHT = 300

const myCanvas = Canvas.getInstance()
export const canvas: HTMLCanvasElement = myCanvas.init(
    GAME_HEIGHT * scaleRatio,
    GAME_WIDTH * scaleRatio
)
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')

export const GAME_STATES = {
    READY: 1,
    RUNNING: 2,
    GAME_OVER: 3,
}

export const PLAYER_STATES = {
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    CROUCH: 4,
}

export const GROUND_POSITION = new Vec2D(0, canvas.height -1050)
