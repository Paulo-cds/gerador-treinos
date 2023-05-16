import { Box } from "@mui/material";
import CreateRunning from "./createTraining";
import { useState } from "react";

const Corrida = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Box>
      <CreateRunning expanded={expanded} setExpanded={setExpanded} />
    </Box>
  );
};

export default Corrida;
