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
import Login from "./Pages/Login";
import { Private } from "./Private";
import Users from "./Pages/Users";

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
          <Route
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/exercises"
            element={
              <Private>
                <Template>
                  <Exercises />
                </Template>
              </Private>
            }
          />
          <Route
            path="/categories"
            element={
              <Private>
                <Template>
                  <Categories />
                </Template>
              </Private>
            }
          />
          <Route
            path="/metods"
            element={
              <Private>
                <Template>
                  <Metods />
                </Template>
              </Private>
            }
          />
          <Route
            path="/trainings"
            element={
              <Private>
                <Template>
                  <Training />
                </Template>
              </Private>
            }
          />
          <Route
            path="/trainingToDay"
            element={
              <Private>
                <Template>
                  <TrainingToDay />
                </Template>
              </Private>
            }
          />
          <Route
            path="/users"
            element={
              <Private>
                <Template>
                  <Users />
                </Template>
              </Private>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
