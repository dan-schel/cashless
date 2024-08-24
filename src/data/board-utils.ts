import type { BoardSide, Player } from "./player";

export function getRelativePlayerLocations(side: BoardSide, players: Player[]) {
  const { myLeftSide, oppositeSide, myRightSide } = getRelativeSides(side);

  return {
    myLeft: players.find((p) => p.side === myLeftSide) ?? null,
    opposite: players.find((p) => p.side === oppositeSide) ?? null,
    myRight: players.find((p) => p.side === myRightSide) ?? null,
  };
}

export function getRelativeSides(side: BoardSide) {
  const sides = ["top", "right", "bottom", "left"];
  const sideIndex = sides.indexOf(side);
  if (sideIndex < 0 || sideIndex > 3) {
    throw new Error();
  }

  const myLeftSide = sides[(sideIndex + 1) % 4];
  const oppositeSide = sides[(sideIndex + 2) % 4];
  const myRightSide = sides[(sideIndex + 3) % 4];

  return { myLeftSide, oppositeSide, myRightSide };
}
