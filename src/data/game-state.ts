import { z } from "zod";
import { Player } from "./player";

export class GameState {
  constructor(
    readonly players: Player[],
    readonly freeParkingBalance: number,
  ) {}

  static readonly json = z
    .object({
      players: Player.json.array(),
      freeParkingBalance: z.number(),
    })
    .transform((x) => new GameState(x.players, x.freeParkingBalance));

  toJSON(): z.input<typeof GameState.json> {
    return {
      players: this.players.map((p) => p.toJSON()),
      freeParkingBalance: this.freeParkingBalance,
    };
  }

  with({
    players = this.players,
    freeParkingBalance = this.freeParkingBalance,
  }: {
    players?: Player[];
    freeParkingBalance?: number;
  }): GameState {
    return new GameState(players, freeParkingBalance);
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
}
