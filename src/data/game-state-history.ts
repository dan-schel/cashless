import { z } from "zod";
import { GameState } from "./game-state";

const maxUndoStackSize = 10;

export class GameStateHistory {
  constructor(
    readonly current: GameState,
    readonly undoStack: GameState[],
    readonly redoStack: GameState[],
  ) {}

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  static readonly json = z
    .object({
      current: GameState.json,
      undoStack: z.array(GameState.json),
      redoStack: z.array(GameState.json),
    })
    .transform(
      (x) => new GameStateHistory(x.current, x.undoStack, x.redoStack),
    );

  toJSON(): z.input<typeof GameStateHistory.json> {
    return {
      current: this.current.toJSON(),
      undoStack: this.undoStack.map((s) => s.toJSON()),
      redoStack: this.redoStack.map((s) => s.toJSON()),
    };
  }

  with({
    current = this.current,
    undoStack = this.undoStack,
    redoStack = this.redoStack,
  }: {
    current: GameState;
    undoStack: GameState[];
    redoStack: GameState[];
  }): GameStateHistory {
    return new GameStateHistory(current, undoStack, redoStack);
  }

  afterNewState(state: GameState): GameStateHistory {
    const undoStack = [this.current, ...this.undoStack];
    undoStack.splice(maxUndoStackSize);
    return this.with({ current: state, undoStack, redoStack: [] });
  }

  afterUndo(): GameStateHistory {
    const [current, ...undoStack] = this.undoStack;
    const redoStack = [this.current, ...this.redoStack];
    return this.with({ current, undoStack, redoStack });
  }

  afterRedo(): GameStateHistory {
    const [current, ...redoStack] = this.redoStack;
    const undoStack = [this.current, ...this.undoStack];
    return this.with({ current, undoStack, redoStack });
  }
}
