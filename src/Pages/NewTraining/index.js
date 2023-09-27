import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  addCategory,
  addPersonalTraining,
  addTraining,
  createPersonalTraining,
  fetchExercises,
  fetchMetods,
  fetchTrainings,
  fetchTrainingsPersonal,
  fetchUsers,
} from "../../Services/routes";
import "./styleTraining.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const NewTraining = () => {
  const [loading, setLoading] = useState(false);
  const [aquecimento, setAquecimento] = useState([]);
  const [mtTreino, setMtTreino] = useState("");
  const [exeTreino, setExeTreino] = useState([]);
  const [trainingGerated, setTrainingGerated] = useState();
  const [ativacao, setAtivacao] = useState("");
  const [open, setOpen] = useState(false);
  const [gerated, setGerated] = useState(false);
  const [roundsAqc, setRoundsAqc] = useState("0");
  const [roundsTraining, setRoundsTraining] = useState("0");
  const [optionsChange, setOptionsChange] = useState([]);
  const [users, setUsers] = useState();
  const [trainings, setTrainings] = useState();
  const [exercises, setExercises] = useState([]);
  const [metods, setMetods] = useState([]);
  const options = { timeZone: "America/Sao_Paulo" };

  const formik = useFormik({
    initialValues: {
      numero: "",
      ativacao: "",
      data: new Date().toLocaleDateString("pt-BR"),
      type: "",
      personal: "",
    },
    validationSchema: yup.object({
      numero: yup.number().required("O campo é obrigatório."),
      ativacao: yup.string(),
      data: yup.date().required("O campo é obrigatório."),
      type: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        //gerando método
        setAtivacao(formik.values.ativacao);
        let notMetod = true;
        let qtdExe = 0;
        if (trainings) {
          while (notMetod) {
            let sortMet = Math.floor(Math.random() * metods.length);
            const verificMet = trainings.Treinos.find(
              (tr) => tr.Metodo === metods[sortMet].nome
            );

            if (!verificMet) {
              setMtTreino(metods[sortMet].nome);
              qtdExe = metods[sortMet].quantidade;
              notMetod = false; // saia do laço quando a sentença for falsa
            }
          }
        } else {
          let sortMet = Math.floor(Math.random() * metods.length);
          qtdExe = metods[sortMet].quantidade;
          setMtTreino(metods[sortMet].nome);
        }
        // final gerando método

        //gerando aquecimento
        let notAqc = true;
        let exeAqc = [];
        if (trainings) {
          while (notAqc) {
            let sortAqc = Math.floor(Math.random() * exercises.length);
            // const verificAqc = trainings.find(
            //   (tr) => tr.aquecimento === exercises[sortAqc].nome
            // );

            let exists = trainings.Treinos.some((train) =>
              train.Exercicios.some(
                (exe) => exe.exercicio === exercises[sortAqc].nome
              )
            );
            let sorted = exeAqc.some(
              (exe) => exe.exercicio === exercises[sortAqc].nome
            );

            if (
              !exists &&
              !sorted &&
              exercises[sortAqc].categoria === "Aquecimento"
            ) {
              exeAqc.push({
                exercicio: exercises[sortAqc].nome,
                reps: "0",
                exemplo: exercises[sortAqc].exemplo,
                id: exercises[sortAqc].id,
              });
              // qtdExe = metods[sortAqc].quantidade;
              if (exeAqc.length == formik.values.numero) {
                notAqc = false; // saia do laço quando a sentença for falsa
                setAquecimento(exeAqc);
              }
            }
          }
        } else {
          while (notAqc) {
            let sortAqc = Math.floor(Math.random() * exercises.length);
            let sorted = exeAqc.some(
              (exe) => exe.exercicio === exercises[sortAqc].nome
            );
            if (!sorted && exercises[sortAqc].categoria === "Aquecimento") {
              exeAqc.push({
                exercicio: exercises[sortAqc].nome,
                reps: "0",
                exemplo: exercises[sortAqc].exemplo,
                id: exercises[sortAqc].id,
              });
              if (exeAqc.length == formik.values.numero) {
                notAqc = false; // saia do laço quando a sentença for falsa
                setAquecimento(exeAqc);
              }
            }
          }
        }
        //final gerando aquecimento

        //gerando exercicios
        let notExe = true;
        let exeTrn = [];
        if (trainings) {
          while (notExe) {
            let sortExe = Math.floor(Math.random() * exercises.length);
            // const verificAqc = trainings.find(
            //   (tr) => tr.aquecimento === exercises[sortAqc].nome
            // );

            let exists = trainings.Treinos.some((train) =>
              train.Exercicios.some(
                (exe) => exe.exercicio === exercises[sortExe].nome
              )
            );
            let sorted = exeTrn.some(
              (exe) => exe.exercicio === exercises[sortExe].nome
            );

            if (
              !exists &&
              !sorted &&
              exercises[sortExe].categoria !== "Aquecimento"
            ) {
              exeTrn.push({
                exercicio: exercises[sortExe].nome,
                reps: "0",
                exemplo: exercises[sortExe].exemplo,
                id: exercises[sortExe].id,
              });
              // qtdExe = metods[sortAqc].quantidade;
              if (exeTrn.length == qtdExe) {
                notExe = false; // saia do laço quando a sentença for falsa
                setExeTreino(exeTrn);
              }
            }
          }
        } else {
          while (notExe) {
            let sortExe = Math.floor(Math.random() * exercises.length);
            let sorted = exeTrn.some(
              (exe) => exe.exercicio === exercises[sortExe].nome
            );
            if (!sorted && exercises[sortExe].categoria !== "Aquecimento") {
              exeTrn.push({
                exercicio: exercises[sortExe].nome,
                reps: "0",
                exemplo: exercises[sortExe].exemplo,
                id: exercises[sortExe].id,
              });
              // qtdExe = metods[sortAqc].quantidade;
              if (exeTrn.length == qtdExe) {
                notExe = false; // saia do laço quando a sentença for falsa
                setExeTreino(exeTrn);
              }
            }
          }
        }
        setGerated(true);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
  });

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
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetMetods = async () => {
    setLoading(true);
    try {
      const newMetods = [];
      const response = await fetchMetods();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newMetods.push(newItem);
      });
      setMetods(newMetods);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
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

  const handleGetTrainings = async () => {
    setLoading(true);
    try {
      const newTrainings = [];
      const response = await fetchTrainings("Treinos");
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newTrainings.push(newItem);
      });
      let control = newTrainings[0];
      control.Treinos = control.Treinos.sort((a, b) => {
        const dataA = new Date(a.Data.split("/").reverse().join("/"));
        const dataB = new Date(b.Data.split("/").reverse().join("/"));
        return dataB - dataA;
      });
      setTrainings(control);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetUsers();
    handleGetMetods();
    handleGetExercises();
    handleGetTrainings();
  }, []);

  const handleSaveTraining = async () => {
    setLoading(true);
    const prev = new Date(formik.values.data);
    prev.setDate(prev.getDate() + 1);
    const viewData = prev.toLocaleDateString("pt-BR", options);
    let newTraining = [];
    const trainingGer = {
      RoundsAqc: roundsAqc,
      RoundsTraining: roundsTraining,
      Aquecimento: aquecimento,
      Ativacao: ativacao,
      Data: viewData,
      Exercicios: exeTreino,
      Metodo: mtTreino,
    };
    newTraining.push(trainingGer);
    let heaveTraining = false;
    if (formik.values.type === "turma") {
      if (trainings) {
        if (trainings.Treinos.length >= 5) {
          trainings.Treinos.pop();
        }
        heaveTraining = trainings.Treinos.find(
          (exe) => exe.Data === newTraining[0].Data
        );
      }
      if (heaveTraining) {
        setOpen(true);
        setLoading(false);
      } else {
        try {
          trainings.Treinos.push(newTraining[0]);
          await addTraining(trainings, trainings.id);
          setTrainingGerated();
          formik.resetForm();
          setGerated(false);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    } else {
      if (trainings) {
        heaveTraining = trainings.Treinos.find(
          (exe) => exe.Data === newTraining[0].Data
        );
      }
      if (heaveTraining) {
        setOpen(true);
        setLoading(false);
      } else {
        try {
          if (trainings) {
            trainings.Treinos.push(newTraining[0]);
            await addPersonalTraining(
              trainings,
              formik.values.personal,
              trainings.id
            );
          } else {
            const trainings = { Treinos: [newTraining[0]] };
            await createPersonalTraining(trainings, formik.values.personal);
            console.log("create ", trainings);
          }

          setTrainingGerated();
          formik.resetForm();
          setGerated(false);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    const handleGetTrainingPersonal = async () => {
      setLoading(true);
      try {
        const newTrainings = [];
        const data = formik.values.personal.replace(" ", "");
        const response = await fetchTrainings(data);
        response.docs.forEach((item) => {
          let newItem = item.data();
          newItem.id = item.id;
          newTrainings.push(newItem);
        });
        let control = newTrainings[0];
        control.Treinos = control.Treinos.sort((a, b) => {
          const dataA = new Date(a.Data.split("/").reverse().join("/"));
          const dataB = new Date(b.Data.split("/").reverse().join("/"));
          return dataB - dataA;
        });
        setTrainings(control);
      } catch (e) {
        setTrainings();
        console.log(e);
      }
      setLoading(false);
    };

    if ((formik.values.type === "personal") & (formik.values.personal !== "")) {
      handleGetTrainingPersonal();
    } else if (formik.values.type === "turma") {
      handleGetTrainings();
    }
  }, [formik.values.personal]);

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const changeRepsAqc = (e, index) => {
    setAquecimento((prevState) =>
      prevState.map((obj, i) => {
        if (i === index) {
          return { ...obj, reps: e.target.value };
        }
        return obj;
      })
    );
  };

  const changeRepsTraining = (e, index) => {
    setExeTreino((prevState) =>
      prevState.map((obj, i) => {
        if (i === index) {
          return { ...obj, reps: e.target.value };
        }
        return obj;
      })
    );
  };

  const handleChangeAqc = (e, index) => {
    let newAqc = [...aquecimento];
    newAqc[index].exercicio = e.target.value.nome;
    newAqc[index].exemplo = e.target.value.exemplo;
    setAquecimento(newAqc);
  };

  const handleChangeTraining = (e, index) => {
    let newAqc = [...exeTreino];
    newAqc[index].exercicio = e.target.value.nome;
    newAqc[index].exemplo = e.target.value.exemplo;
    setExeTreino(newAqc);
  };

  const onDragEnd = (result) => {
    console.log(result);
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
      }}
      alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
    >
      <Box
        width={{ xs: "90%", sm: "90%", md: "50%" }}
        sx={{ height: "100%" }}
        ml={{ xs: 0, sm: 0, md: 4 }}
        mt={{ xs: 3, sm: 3, md: 0 }}
        // className="containerGerateTraining"
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            O treino de hoje já foi gerado!
          </Alert>
        </Snackbar>
        <Paper sx={{ mb: 2, p:2 }} className="containerGerate">
          <Typography sx={{ width: 1, flexShrink: 0 }}>
            Gerar novo treino
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt:2
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.type}
                label="type"
                name="type"
                onChange={formik.handleChange}
              >
                <MenuItem value={"turma"}>Turma</MenuItem>
                <MenuItem value={"personal"}>Personal</MenuItem>
              </Select>
            </FormControl>
            {formik.values.type === "personal" && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Aluno</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.personal}
                  label="personal"
                  name="personal"
                  onChange={formik.handleChange}
                >
                  {users.map(
                    (user, index) =>
                      user.tipo === "personal" && (
                        <MenuItem key={index} value={user.nome}>
                          {user.nome}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            )}
            <TextField
              name="numero"
              value={formik.values.numero}
              label="Qtd aquecimento"
              onChange={formik.handleChange}
            />
            <TextField
              name="ativacao"
              value={formik.values.ativacao}
              label="Ativação neural"
              onChange={formik.handleChange}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                gap: 2,
              }}
              flexDirection={{
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
              }}
            >
              <TextField
                name="data"
                value={formik.values.data}
                label="Data"
                type="date"
                onChange={formik.handleChange}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  gap: 2,
                }}
              >
                <Button variant="contained" type="submit">
                  {!gerated ? "Gerar" : "Gerar novo"}
                </Button>
                {gerated && (
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => handleSaveTraining()}
                  >
                    Salvar
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          {gerated && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 2,
                mt: 2,
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              <Typography variant="h4">Novo treino</Typography>
              <Box sx={{ borderTop: "1px solid black" }}>
                <Typography variant="h6">Método</Typography>
                <Typography>{mtTreino}</Typography>
              </Box>
              <Box sx={{ borderTop: "1px solid black" }}>
                <Typography variant="h6">Aquecimento</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    mb: 2,
                  }}
                >
                  <Typography sx={{ width: "70%" }}>Rounds</Typography>
                  <TextField
                    sx={{ width: "30%" }}
                    variant="standard"
                    label="Rounds"
                    value={roundsAqc}
                    onChange={(e) => setRoundsAqc(e.target.value)}
                    type="text"
                  />
                </Box>
                {aquecimento.length > 0 && (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="characters">
                      {(provided) => (
                        <Box
                          className="characters"
                          {...provided.droppableProps}
                          innerRef={provided.innerRef}
                          provided={provided}
                        >
                          {aquecimento.map((exe, index) => (
                            <Draggable
                              key={exe.id}
                              draggableId={exe.id}
                              index={index}
                            >
                              {(provided) => {
                                return (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-evenly",
                                      m: 1,
                                    }}
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Box sx={{ width: "60%" }}>
                                      <FormControl
                                        variant="standard"
                                        sx={{ width: "100%" }}
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          {exe.exercicio}
                                        </InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          onChange={(e) =>
                                            handleChangeAqc(e, index)
                                          }
                                          value={exe.exercicio}
                                          label={exe.exercicio}
                                        >
                                          {optionsChange.map(
                                            (opt) =>
                                              opt.categoria ===
                                                "Aquecimento" && (
                                                <MenuItem value={opt}>
                                                  {opt.nome}
                                                </MenuItem>
                                              )
                                          )}
                                        </Select>
                                      </FormControl>
                                    </Box>
                                    <TextField
                                      sx={{ width: "30%" }}
                                      variant="standard"
                                      label="repetições"
                                      value={exe.reps}
                                      onChange={(e) => changeRepsAqc(e, index)}
                                      type="text"
                                    />
                                    {provided.placeholder}
                                  </Box>
                                );
                              }}
                            </Draggable>
                          ))}
                        </Box>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </Box>
              <Box sx={{ borderTop: "1px solid black" }}>
                <Typography variant="h6">Ativação Neural</Typography>
                <Typography>{ativacao}</Typography>
              </Box>
              <Box sx={{ borderTop: "1px solid black" }}>
                <Typography variant="h6">Exercícios</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    mb: 2,
                  }}
                >
                  <Typography sx={{ width: "70%" }}>Rounds</Typography>
                  <TextField
                    sx={{ width: "30%" }}
                    variant="standard"
                    label="Rounds"
                    value={roundsTraining}
                    onChange={(e) => setRoundsTraining(e.target.value)}
                    type="text"
                  />
                </Box>
                {exeTreino.map((exe, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-evenly",
                      m: 1,
                    }}
                  >
                    <Box sx={{ width: "60%" }}>
                      <FormControl variant="standard" sx={{ width: "100%" }}>
                        <InputLabel
                          variant="standard"
                          htmlFor="uncontrolled-native"
                        >
                          {exe.exercicio}
                        </InputLabel>
                        <Select
                          onChange={(e) => handleChangeTraining(e, index)}
                          value={exe.exercicio}
                          label={exe.exercicio}
                        >
                          {optionsChange.map(
                            (opt) =>
                              opt.categoria !== "Aquecimento" && (
                                <MenuItem value={opt}>{opt.nome}</MenuItem>
                              )
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      sx={{ width: "30%" }}
                      variant="standard"
                      value={exe.reps}
                      onChange={(e) => changeRepsTraining(e, index)}
                      type="text"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
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
