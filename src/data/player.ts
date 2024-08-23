export type BoardSide = "top" | "bottom" | "left" | "right";

export class Player {
  constructor(
    readonly id: string,
    readonly balance: number,
    readonly side: BoardSide,
  ) {}

  with({
    id = this.id,
    balance = this.balance,
    side = this.side,
  }: {
    id?: string;
    balance?: number;
    side?: BoardSide;
  }) {
    return new Player(id, balance, side);
  }
}
