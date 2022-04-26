import styled from "styled-components";

interface CellProps {
  active: Boolean;
}

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const Cell = styled.div<CellProps>`
  height: 20px;
  width: 20px;

  border: 1px solid #222;

  background: ${(props) => (props.active ? "#222" : "#fff")};
`;
