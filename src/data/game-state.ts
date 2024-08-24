import type { Player } from "./player";

export class GameState {
  constructor(
    readonly players: Player[],
    readonly freeParkingBalance: number,
  ) {}

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
}
