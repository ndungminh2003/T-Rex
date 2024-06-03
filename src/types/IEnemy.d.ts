export interface IEnemy {
    public update(frameTimeDelta: number, gameSpeed: number): void
    public render(): void
}
