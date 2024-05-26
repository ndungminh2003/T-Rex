import { Canvas } from "../canvas/Canvas"
import { getScaleRatio } from "./Utilities"

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

const GAME_WIDTH = 800
const GAME_HEIGHT = 300

const myCanvas = Canvas.getInstance() 
export const canvas: HTMLCanvasElement = myCanvas.init(GAME_HEIGHT * scaleRatio, GAME_WIDTH * scaleRatio)
export const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')



