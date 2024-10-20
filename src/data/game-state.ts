import { z } from "zod";
import { Player } from "./player";

export type BoardRotation = 0 | 1 | 2 | 3;

export class GameState {
  constructor(
    readonly players: Player[],
    readonly freeParkingBalance: number,
    readonly boardRotation: BoardRotation,
  ) {}

  static readonly json = z
    .object({
      players: Player.json.array(),
      freeParkingBalance: z.number(),
      boardRotation: z.union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
      ]),
    })
    .transform(
      (x) => new GameState(x.players, x.freeParkingBalance, x.boardRotation),
    );

  toJSON(): z.input<typeof GameState.json> {
    return {
      players: this.players.map((p) => p.toJSON()),
      freeParkingBalance: this.freeParkingBalance,
      boardRotation: this.boardRotation,
    };
  }

  with({
    players = this.players,
    freeParkingBalance = this.freeParkingBalance,
    boardRotation = this.boardRotation,
  }: {
    players?: Player[];
    freeParkingBalance?: number;
    boardRotation?: BoardRotation;
  }): GameState {
    return new GameState(players, freeParkingBalance, boardRotation);
  }

  withPlayer(player: Player): GameState {
    return this.with({
      players: this.players.map((p) => (p.id === player.id ? player : p)),
    });
  }

  afterPayment(
    from: Player,
    to: Player | "bank" | "free-parking",
    amount: number,
  ): GameState {
    let state: GameState = this;
    state = state.withPlayer(from.with({ balance: from.balance - amount }));

    if (to === "free-parking") {
      state = state.with({
        freeParkingBalance: state.freeParkingBalance + amount,
      });
    } else if (to !== "bank") {
      state = state.withPlayer(to.with({ balance: to.balance + amount }));
    }

    return state;
  }

  afterEarning(player: Player, amount: number): GameState {
    return this.withPlayer(player.with({ balance: player.balance + amount }));
  }

  afterCollectingFreeParking(player: Player): GameState {
    const paidPlayer = player.with({
      balance: player.balance + this.freeParkingBalance,
    });
    return this.withPlayer(paidPlayer).with({ freeParkingBalance: 0 });
  }

  afterPassingGo(player: Player): GameState {
    return this.withPlayer(
      player.with({
        balance: player.balance + 200,
      }),
    );
  }

  afterMortgaging(player: Player, amount: number): GameState {
    return this.withPlayer(player.with({ balance: player.balance + amount }));
  }

  afterUnmortgaging(player: Player, amount: number): GameState {
    return this.withPlayer(player.with({ balance: player.balance - amount }));
  }

  afterRotatingBoard(): GameState {
    return this.with({
      boardRotation: ((this.boardRotation + 1) % 4) as BoardRotation,
    });
  }
}
