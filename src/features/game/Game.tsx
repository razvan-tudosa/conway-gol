import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Grid, Controls, Status } from "./components";
import {
  selectGrid,
  selectStatus,
  toggleCell,
  start,
  stop,
  reset,
  randomize,
} from "./logic";

import { Wrapper } from "./styled";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const grid = useAppSelector(selectGrid);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const handleOnCellClick = (targetRow: number, targetCell: number) => () =>
    dispatch(toggleCell({ targetRow, targetCell }));

  const handleStart = () => dispatch(start());
  const handleStop = () => dispatch(stop());
  const handleReset = () => dispatch(reset());
  const handleRandomize = () => dispatch(randomize());

  return (
    <Wrapper>
      <Controls
        handleStart={handleStart}
        handleStop={handleStop}
        handleReset={handleReset}
        handleRandomize={handleRandomize}
      />
      <Status status={status} />
      <Grid gridData={grid} onCellClick={handleOnCellClick} />
    </Wrapper>
  );
};

export default Game;
