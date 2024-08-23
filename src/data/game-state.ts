import type { Player } from "./player";

export class GameState {
  constructor(readonly players: Player[]) {}

  with({ players = this.players }: { players?: Player[] }) {
    return new GameState(players);
  }

  withPlayer(index: number, player: Player) {
    const players = [...this.players];
    players[index] = player;
    return this.with({ players });
  }
}
