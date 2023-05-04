import { Box } from "@mui/material";
import Header from "../Header";

const Template = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Box
        sx={{
          width: "100%",
          mt: 6,
          p: 1,
          minHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Template;
