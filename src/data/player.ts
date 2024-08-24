import { z } from "zod";

export type BoardSide = "top" | "bottom" | "left" | "right";

export class Player {
  constructor(
    readonly id: string,
    readonly balance: number,
    readonly side: BoardSide,
  ) {}

  static readonly json = z
    .object({
      id: z.string(),
      balance: z.number(),
      side: z.enum(["top", "bottom", "left", "right"]),
    })
    .transform((x) => new Player(x.id, x.balance, x.side));

  toJSON(): z.input<typeof Player.json> {
    return {
      id: this.id,
      balance: this.balance,
      side: this.side,
    };
  }

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
