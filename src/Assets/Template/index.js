import { Box } from "@mui/material";
import Header from "../Header";

const Template = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        width={{ xs: "90%", sm: "90%", md: "100%" }}
        height={{ xs: "95vh", sm: "95vh", md: "100vh" }}
        mt={{ xs: 6, sm: 6, md: 0 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Template;
