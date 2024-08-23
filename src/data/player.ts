export type BoardSide = "top" | "bottom" | "left" | "right";

export class Player {
  constructor(
    readonly balance: number,
    readonly side: BoardSide,
  ) {}

  with({
    balance = this.balance,
    side = this.side,
  }: {
    balance?: number;
    side?: BoardSide;
  }) {
    return new Player(balance, side);
  }
}
