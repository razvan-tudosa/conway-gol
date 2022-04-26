import { RootState } from "../../../app/store";

export const selectGrid = (state: RootState) => state.game.grid;
export const selectStatus = (state: RootState) => state.game.status;
