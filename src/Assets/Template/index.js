import { Box } from "@mui/material";
import Header from "../Header";

const Template = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height:'100vh', }}>
      <Header />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // minHeight: "100vh",
        }}
        // width={{ xs: "90%", sm: "90%", md: "100%" }}
        // height={{ xs: "95vh", sm: "95vh", md: "100vh" }}
        mt={{ xs: 7, sm: 7, md: 8 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Template;
