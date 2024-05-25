export class Vec2D {
    private x: number
    private y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public getX() {
        return this.x
    }

    public getY() {
        return this.y
    }

    public setX(x: number) {
        this.x = x
    }

    public setY(y: number) {
        this.y = y
    }

    public static add(v1: Vec2D, v2: Vec2D) {
        return new Vec2D(v1.getX() + v2.getX(), v1.getY() + v2.getY())
    }

    public static sub(v1: Vec2D, v2: Vec2D) {
        return new Vec2D(v1.getX() - v2.getX(), v1.getY() - v2.getY())
    }

    public static mul(v1: Vec2D, m: number) {
        return new Vec2D(v1.getX() * m, v1.getY() * m)
    }

    public static distance(v1: Vec2D, v2: Vec2D) {
        return Math.sqrt((v1.getX() - v2.getX()) ** 2 + (v1.getY() - v2.getY()) ** 2)
    }
}
