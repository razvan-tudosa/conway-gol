import type { GridRow, GameGrid } from "./types";
import { config } from "../config";

export const generateInitialGrid = (): GameGrid => {
  const generateEmptyRow = (): GridRow =>
    [...Array(config.gridCols)].map((_) => 0);

  const grid = [];

  for (let i = 0; i < config.gridRows; i++) {
    grid.push(generateEmptyRow());
  }

  return grid;
};

const copyGrid = (targetGrid: GameGrid): GameGrid => {
  const newGrid: GameGrid = [];
  for (let rowIndex = 0; rowIndex < config.gridRows; rowIndex++) {
    if (!newGrid[rowIndex]) {
      newGrid.push([]);
    }

    for (let colIndex = 0; colIndex < config.gridCols; colIndex++) {
      newGrid[rowIndex][colIndex] = targetGrid[rowIndex][colIndex];
    }
  }

  return newGrid;
};

const isWithinBounds = (targetRow: number, targetCol: number): boolean => {
  const isRowOk = targetRow >= 0 && targetRow < config.gridRows;
  const isColOk = targetCol >= 0 && targetCol < config.gridCols;

  return isRowOk && isColOk;
};

const computeAliveNeighbours = (
  grid: GameGrid,
  subjectRow: number,
  subjectCol: number
): number => {
  let neighbours = 0;
  const directions = [
    [-1, -1], // NW
    [-1, 0], // N
    [-1, 1], // NE
    [0, 1], // E
    [1, 1], // SE
    [1, 0], // S
    [1, -1], // SW
    [0, -1], // W
  ];

  directions.forEach((direction) => {
    const rowOffset = direction[0];
    const colOffset = direction[1];

    const targetRow = subjectRow + rowOffset;
    const targetCol = subjectCol + colOffset;

    if (isWithinBounds(targetRow, targetCol)) {
      if (grid[targetRow][targetCol]) {
        neighbours++;
      }
    }
  });

  return neighbours;
};

export const computeNextFrame = (initialGrid: GameGrid): GameGrid => {
  // docs: en.wikipedia.org/wiki/Conway%27s_Game_of_Life
  const grid = copyGrid(initialGrid);

  for (let rowIndex = 0; rowIndex < config.gridRows; rowIndex++) {
    for (let colIndex = 0; colIndex < config.gridCols; colIndex++) {
      const neighbours = computeAliveNeighbours(
        initialGrid,
        rowIndex,
        colIndex
      );
      // console.log(rowIndex, colIndex, neighbours);

      const currentCellState = grid[rowIndex][colIndex];

      if (currentCellState === 1) {
        if (neighbours < 2 || neighbours > 3) {
          // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
          // Any live cell with more than three live neighbours dies, as if by overpopulation.
          grid[rowIndex][colIndex] = 0;
        }
      } else if (neighbours === 3) {
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        grid[rowIndex][colIndex] = 1;
      }
    }
  }

  return grid;
};

export const getRandomizedGrid = (): GameGrid => {
  const grid = [];

  const generateRow = (): GridRow =>
    [...Array(config.gridCols)].map((_) => (Math.random() > 0.8 ? 1 : 0));

  for (let rowIndex = 0; rowIndex < config.gridRows; rowIndex++) {
    grid.push(generateRow());
  }

  return grid;
};
