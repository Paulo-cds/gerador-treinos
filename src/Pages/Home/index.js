import { Box, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Backdrop from "../../Assets/backdrop.jpg";
import "./homeStyle.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${Backdrop})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "xl",
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={5} sx={{ width: "100%", alignItems: "center" }}>
          <Item
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/exercises")}
            className="buttons"
          >
            Exercícios
          </Item>
          <Item
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/categories")}
            className="buttons"
          >
            Categorias
          </Item>
          <Item
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/metods")}
            className="buttons"
          >
            Métodos
          </Item>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
