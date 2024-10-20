import type { BoardRotation, GameState } from "@/data/game-state";
import type { BoardSpace } from "./spaces";
import type { Player } from "@/data/player";

export type Position = { column: number; row: number };

export function rotatePosition(
  rotation: BoardRotation,
  space: BoardSpace,
): Position {
  if (rotation === 1) {
    return {
      column: 10 - space.row,
      row: space.column,
    };
  }
  if (rotation === 2) {
    return {
      column: 10 - space.column,
      row: 10 - space.row,
    };
  }
  if (rotation === 3) {
    return {
      column: space.row,
      row: 10 - space.column,
    };
  } else {
    return {
      column: space.column,
      row: space.row,
    };
  }
}

export function getBoardEdge(position: Position) {
  if (position.column === 0) {
    return "left";
  } else if (position.column === 10) {
    return "right";
  } else if (position.row === 0) {
    return "top";
  } else if (position.row === 10) {
    return "bottom";
  } else {
    return null;
  }
}

export function chooseRotation(
  gameState: GameState,
  player: Player,
): BoardRotation {
  let offset = 0;

  if (player.side === "right") {
    offset = 1;
  } else if (player.side === "top") {
    offset = 2;
  } else if (player.side === "left") {
    offset = 3;
  }

  return ((gameState.boardRotation + offset) % 4) as BoardRotation;
}
