import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Template from "./Assets/Template";
import Home from "./Pages/Home";
import Exercises from "./Pages/Exercises";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Template>
              <Home />
            </Template>
          }
        />
        <Route
          path="/exercises"
          element={
            <Template>
              <Exercises />
            </Template>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
