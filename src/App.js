import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Template from "./Assets/Template";
import Home from "./Pages/Home";
import Exercises from "./Pages/Exercises";
import Categories from "./Pages/Categories";
import Metods from "./Pages/Metods";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
