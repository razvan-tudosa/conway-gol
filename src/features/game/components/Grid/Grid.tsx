import React from "react";
import { GameGrid } from "../../logic/types";
import { Grid, Row, Cell } from "./grid.styled";

interface GridProps {
  gridData: GameGrid;
  onCellClick: (targetRow: number, targetCell: number) => any;
}

export const GridComponent: React.FC<GridProps> = ({
  gridData,
  onCellClick,
}) => (
  <Grid>
    {gridData.map((row: Array<number>, rIndex: number) => (
      <Row key={`row-${rIndex}`}>
        {row.map((cell: number, cIndex: number) => (
          <Cell
            key={`cell-${rIndex}-${cIndex}`}
            active={Boolean(cell)}
            onClick={onCellClick(rIndex, cIndex)}
          />
        ))}
      </Row>
    ))}
  </Grid>
);
