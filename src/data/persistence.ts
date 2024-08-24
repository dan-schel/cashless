import { GameStateHistory } from "./game-state-history";

const lsKey = "cashless-state-history";

export function persistState(state: GameStateHistory) {
  localStorage.setItem(lsKey, JSON.stringify(state.toJSON()));
}

export function loadState(): GameStateHistory | null {
  const json = localStorage.getItem(lsKey);
  if (json == null) {
    return null;
  }
  return GameStateHistory.json.parse(JSON.parse(json));
}

export function isSavedStateAvailable(): boolean {
  return localStorage.getItem(lsKey) != null;
}
