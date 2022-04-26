import React from "react";

import { Status } from "./status.styled";

interface StatusProps {
  status: string;
}

export const StatusComponent: React.FC<StatusProps> = ({ status }) => (
  <Status>Game is {status}!</Status>
);
