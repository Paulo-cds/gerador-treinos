import {
  Alert,
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchExercises,
  fetchUsers,
} from "../../Services/routes";
import "./styleTraining.css";
import FunctionalTraining from "./functionalTraining";
import RunTraining from "./runTraining";

const NewTraining = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [optionsChange, setOptionsChange] = useState([]);
  const [users, setUsers] = useState();
  const [exercises, setExercises] = useState([]);
  const [trainingType, setTrainingType] = useState("funcional");

  const handleGetExercises = async () => {
    try {
      const newExercises = [];
      const response = await fetchExercises();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newExercises.push(newItem);
      });
      setExercises(newExercises);
      setOptionsChange(
        newExercises.sort((a, b) => a.nome.localeCompare(b.nome))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const newUser = [];
      const response = await fetchUsers();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newUser.push(newItem);
      });
      let control = newUser;
      setUsers(control);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetUsers();
    handleGetExercises();
  }, []);

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(https://blog.oficialfarma.com.br/wp-content/uploads/2018/11/238397-x-passos-para-conciliar-trabalho-e-academia.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pb: 3,
      }}
      alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
    >
      <Box
        width={{ xs: "90%", sm: "90%", md: "50%" }}
        sx={{
          height: "100%",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        ml={{ xs: 0, sm: 0, md: 4 }}
        mt={{ xs: 3, sm: 3, md: 0 }}
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            O treino de hoje já foi gerado!
          </Alert>
        </Snackbar>
        <Paper sx={{ mb: 2, p: 2 }} className="containerGerate">
          <Typography sx={{ width: 1, flexShrink: 0 }}>
            Gerar novo treino
          </Typography>
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{ mt: 2 }}
          >
            <Button
              variant={trainingType === "funcional" ? "contained" : "outlined"}
              onClick={() => setTrainingType("funcional")}
            >
              Funcional
            </Button>
            <Button
              variant={trainingType === "corrida" ? "contained" : "outlined"}
              onClick={() => setTrainingType("corrida")}
            >
              Corrida
            </Button>
          </ButtonGroup>
          {trainingType === "funcional" ? (
            <FunctionalTraining
              users={users}
              exercises={exercises}
              optionsChange={optionsChange}
              setOpen={setOpen}
            />
          ) : (
            <RunTraining
              users={users}
              optionsChange={optionsChange}
              setOpen={setOpen}
            />
          )}
        </Paper>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Box>
  );
};

export default NewTraining;
