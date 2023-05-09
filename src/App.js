import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Template from "./Assets/Template";
import Home from "./Pages/Home";
import Exercises from "./Pages/Exercises";
import Categories from "./Pages/Categories";
import Metods from "./Pages/Metods";
import Training from "./Pages/Training";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import TrainingToDay from "./Pages/TrainingToDay";

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/exercises"
            element={
              <Template>
                <Exercises />
              </Template>
            }
          />
          <Route
            path="/categories"
            element={
              <Template>
                <Categories />
              </Template>
            }
          />
          <Route
            path="/metods"
            element={
              <Template>
                <Metods />
              </Template>
            }
          />
          <Route
            path="/trainings"
            element={
              <Template>
                <Training />
              </Template>
            }
          />
          <Route
            path="/trainingToDay"
            element={
              <Template>
                <TrainingToDay />
              </Template>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
