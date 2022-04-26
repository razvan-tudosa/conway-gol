import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../app/store";
import { config } from "../config";

import { GameState, GameStatuses, toggleCellPayload } from "./types";
import {
  computeNextFrame,
  generateInitialGrid,
  getRandomizedGrid,
} from "./utils";

const initialState: GameState = {
  grid: generateInitialGrid(),
  status: GameStatuses.STOPPED,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    toggleCell: (state, action: PayloadAction<toggleCellPayload>) => {
      const { targetRow, targetCell } = action.payload;

      state.grid[targetRow][targetCell] = state.grid[targetRow][targetCell]
        ? 0
        : 1;
    },
    setGameStatusToRunning: (state) => {
      state.status = GameStatuses.RUNNING;
    },
    performNextIteration: (state) => {
      state.grid = computeNextFrame(state.grid);
    },
    stop: (state) => {
      state.status = GameStatuses.STOPPED;
    },
    reset: (state) => {
      state.grid = generateInitialGrid();
      state.status = GameStatuses.STOPPED;
    },
    randomize: (state) => {
      state.grid = getRandomizedGrid();
    },
  },
});

const nextTick = (): AppThunk => (dispatch, getState) => {
  const state = getState();

  if (state.game.status === GameStatuses.RUNNING) {
    dispatch(gameSlice.actions.performNextIteration());

    setTimeout(() => {
      dispatch(nextTick());
    }, config.msRefreshRate);
  }
};

export const start = (): AppThunk => (dispatch, getState) => {
  dispatch(gameSlice.actions.setGameStatusToRunning());
  const state = getState();

  if (state.game.status === GameStatuses.RUNNING) {
    dispatch(nextTick());
  }
};

export const { toggleCell, randomize, reset, stop } = gameSlice.actions;
export default gameSlice.reducer;
