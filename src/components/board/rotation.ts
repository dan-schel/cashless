import type { BoardSpace } from "./spaces";

export type Position = { column: number; row: number };

export function rotatePosition(
  rotation: 0 | 1 | 2 | 3,
  space: BoardSpace,
): Position {
  // TODO
  return space;
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
