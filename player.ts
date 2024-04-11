class Player {
    readonly name: string = "Player1";
    gold: number = 0;
    arrows: number = 0;
    constructor(newName?: string) {
        if (newName !== undefined) {
            this.name = newName;
        }
    }
}
