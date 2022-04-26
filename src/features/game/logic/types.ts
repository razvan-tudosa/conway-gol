export type GridRow = Array<0 | 1>;
export type GameGrid = Array<GridRow>;

export enum GameStatuses {
  STOPPED = "stopped",
  RUNNING = "running",
}

export interface GameState {
  grid: GameGrid;
  status: GameStatuses;
}

export type toggleCellPayload = {
  targetRow: number;
  targetCell: number;
};
