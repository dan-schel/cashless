type BoardSpaceShape = {
  id: string;
  column: number;
  row: number;
  category: string;
};

export const spaces = [
  { id: "go", column: 10, row: 10, category: "other" },
  { id: "brown-1", column: 9, row: 10, category: "brown" },
  { id: "chest-1", column: 8, row: 10, category: "other" },
  { id: "brown-2", column: 7, row: 10, category: "brown" },
  { id: "tax-1", column: 6, row: 10, category: "other" },
  { id: "station-1", column: 5, row: 10, category: "station" },
  { id: "light-blue-1", column: 4, row: 10, category: "light-blue" },
  { id: "chance-1", column: 3, row: 10, category: "other" },
  { id: "light-blue-2", column: 2, row: 10, category: "light-blue" },
  { id: "light-blue-3", column: 1, row: 10, category: "light-blue" },
  { id: "jail", column: 0, row: 10, category: "other" },
  { id: "pink-1", column: 0, row: 9, category: "pink" },
  { id: "utility-1", column: 0, row: 8, category: "utility" },
  { id: "pink-2", column: 0, row: 7, category: "pink" },
  { id: "pink-3", column: 0, row: 6, category: "pink" },
  { id: "station-2", column: 0, row: 5, category: "station" },
  { id: "orange-1", column: 0, row: 4, category: "orange" },
  { id: "chest-2", column: 0, row: 3, category: "other" },
  { id: "orange-2", column: 0, row: 2, category: "orange" },
  { id: "orange-3", column: 0, row: 1, category: "orange" },
  { id: "free-parking", column: 0, row: 0, category: "other" },
  { id: "red-1", column: 1, row: 0, category: "red" },
  { id: "chance-2", column: 2, row: 0, category: "other" },
  { id: "red-2", column: 3, row: 0, category: "red" },
  { id: "red-3", column: 4, row: 0, category: "red" },
  { id: "station-3", column: 5, row: 0, category: "station" },
  { id: "yellow-1", column: 6, row: 0, category: "yellow" },
  { id: "yellow-2", column: 7, row: 0, category: "yellow" },
  { id: "utility-2", column: 8, row: 0, category: "utility" },
  { id: "yellow-3", column: 9, row: 0, category: "yellow" },
  { id: "go-to-jail", column: 10, row: 0, category: "other" },
  { id: "green-1", column: 10, row: 1, category: "green" },
  { id: "green-2", column: 10, row: 2, category: "green" },
  { id: "chest-3", column: 10, row: 3, category: "other" },
  { id: "green-3", column: 10, row: 4, category: "green" },
  { id: "station-4", column: 10, row: 5, category: "station" },
  { id: "chance-3", column: 10, row: 6, category: "other" },
  { id: "dark-blue-1", column: 10, row: 7, category: "dark-blue" },
  { id: "tax-2", column: 10, row: 8, category: "other" },
  { id: "dark-blue-2", column: 10, row: 9, category: "dark-blue" },
] as const satisfies BoardSpaceShape[];

export type BoardSpace = (typeof spaces)[number];
export type BoardSpaceId = BoardSpace["id"];
export type BoardSpaceCategory = BoardSpace["category"];

export const houseCategories: BoardSpaceCategory[] = [
  "brown",
  "light-blue",
  "pink",
  "orange",
  "red",
  "yellow",
  "green",
  "dark-blue",
];

export const mortgagableCategories: BoardSpaceCategory[] = [
  ...houseCategories,
  "utility",
  "station",
];
