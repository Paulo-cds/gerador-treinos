import {
  Backdrop,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  editTrainingData,
  fetchExercises,
  fetchOneTraining,
} from "../../Services/routes";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Player from "../../Assets/Player";
import AlertFeedBack from "../../Assets/Components/alertFeedBack";
import LoadingDefault from "../../Assets/Components/loadingDefault";

const EditFunctionalTraining = ({
  trainingId,
  open,
  setOpen,
  handleGetTrainings,
}) => {
  const [loading, setLoading] = useState(false);
  const [optionsChange, setOptionsChange] = useState([]);
  const [aquecimento, setAquecimento] = useState([]);
  const [exeTreino, setExeTreino] = useState([]);
  const options = { timeZone: "America/Sao_Paulo" };
  const [openPlayer, setOpenPlayer] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");

  const formik = useFormik({
    initialValues: {
      ativacao: "",
      observation: "",
      title: "",
      finalizabled: true,
      finalized: false,
      roundsAqc: "",
      roundsTraining: "",
    },
    validationSchema: yup.object({
      ativacao: yup.string(),
      observation: yup.string(),
      roundsAqc: yup.string().required("O campo é obrigatório."),
      roundsTraining: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const prev = new Date();
        prev.setDate(prev.getDate());
        const viewData = prev.toLocaleDateString("pt-BR", options);
        const data = {
          RoundsAqc: values.roundsAqc,
          RoundsTraining: values.roundsTraining,
          Editado: viewData,
          Aquecimento: aquecimento,
          Ativacao: values.ativacao,
          Exercicios: exeTreino,
          Observacao: values.observation,
          Titulo: values.title,
          Finalizavel: values.finalizabled,
          Finalizado: values.finalized,
        };
        await editTrainingData(data, trainingId);
        setSeverity("success");
        setTitle("Treino editado com sucesso!");
        setOpenAlert(true);
        setOpen(false);
        handleGetTrainings();
      } catch (e) {
        console.log(e);
        setSeverity("error");
        setTitle("Erro ao editar treino, tente novamente.");
        setOpenAlert(true);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    handleGetTraining();
    handleGetExercises();
  }, []);

  const handleGetTraining = async () => {
    setLoading(true);
    try {
      const response = await fetchOneTraining(trainingId);
      setAquecimento(response.Aquecimento);
      setExeTreino(response.Exercicios);
      formik.setFieldValue("title", response.Titulo);
      formik.setFieldValue("ativacao", response.Ativacao);
      formik.setFieldValue("finalizabled", response.Finalizavel);
      formik.setFieldValue("finalized", response.Finalizado);
      formik.setFieldValue("observation", response.Observacao);
      formik.setFieldValue("roundsAqc", response.RoundsAqc);
      formik.setFieldValue("roundsTraining", response.RoundsTraining);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleGetExercises = async () => {
    try {
      const newExercises = [];
      const response = await fetchExercises();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newExercises.push(newItem);
      });
      setOptionsChange(
        newExercises.sort((a, b) => a.nome.localeCompare(b.nome))
      );
    } catch (e) {
      console.log(e);
    }
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

  const handleSetVideo = (link) => {
    setLinkVideo(link);
    setOpenPlayer(true);
  };

  return (
    <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          width: "500px",
          maxWidth: "90%",
          p: 2,
          borderRadius: "20px",
          maxHeight: "95%",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Player open={openPlayer} setOpen={setOpenPlayer} link={linkVideo} />
        <Typography variant="h5" color="black" sx={{ textAlign: "center" }}>
          Editando treino
        </Typography>
        <TextField
          name="title"
          value={formik.values.title}
          label="Título"
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
          <Box>
            <Typography variant="h6" color="black">
              Aquecimento
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-evenly",
                mb: 2,
              }}
            >
              <Typography sx={{ width: "70%" }} color="black">
                Rounds
              </Typography>
              <TextField
                sx={{ width: "30%" }}
                variant="standard"
                label="Rounds"
                value={formik.values.roundsAqc}
                onChange={formik.handleChange}
                type="text"
              />
            </Box>
            {aquecimento.length > 0 && (
              <Box className="characters">
                {aquecimento.map((exe, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      m: 1,
                    }}
                  >
                    <Box sx={{ width: "60%", display: "flex" }}>
                      <Box>
                        {exe.exemplo && (
                          <HelpOutlineIcon
                            sx={{
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "black",
                            }}
                            onClick={() => handleSetVideo(exe.exemplo)}
                          />
                        )}
                      </Box>
                      <FormControl variant="standard" sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-label">
                          {exe.exercicio}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          onChange={(e) => handleChangeAqc(e, index)}
                          label={exe.exercicio}
                          displayEmpty
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                                overflowY: "auto",
                              },
                            },
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                          }}
                        >
                          {optionsChange.map(
                            (opt) =>
                              opt.categoria === "Aquecimento" && (
                                <MenuItem
                                  value={opt}
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                    position: "relative",
                                  }}
                                >
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
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box sx={{ borderTop: "1px solid black" }}>
            <Typography variant="h6" color="black">
              Exercícios
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-evenly",
                mb: 2,
              }}
            >
              <Typography sx={{ width: "70%" }} color="black">
                Rounds
              </Typography>
              <TextField
                sx={{ width: "30%" }}
                variant="standard"
                label="Rounds"
                value={formik.values.roundsTraining}
                onChange={formik.handleChange}
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
                <Box sx={{ width: "60%", display: "flex" }}>
                  <Box>
                    {exe.exemplo && (
                      <HelpOutlineIcon
                        sx={{
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "black",
                        }}
                        onClick={() => handleSetVideo(exe.exemplo)}
                      />
                    )}
                  </Box>

                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      {exe.exercicio}
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => handleChangeTraining(e, index)}
                      label={exe.exercicio}
                      displayEmpty
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                            overflowY: "auto",
                          },
                        },
                        getContentAnchorEl: null,
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                      }}
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
        <TextField
          name="observation"
          value={formik.values.observation}
          label="Observação"
          onChange={formik.handleChange}
          sx={{ mt: 2 }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.finalizabled}
                onChange={() =>
                  formik.setFieldValue(
                    "finalizabled",
                    !formik.values.finalizabled
                  )
                }
              />
            }
            label="Finalizável"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.finalized}
                onChange={() =>
                  formik.setFieldValue("finalized", !formik.values.finalized)
                }
              />
            }
            label="Finalizado"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </Box>
      <AlertFeedBack
        open={openAlert}
        setOpen={setOpenAlert}
        title={title}
        severity={severity}
      />
      <LoadingDefault open={loading} />
    </Backdrop>
  );
};

export default EditFunctionalTraining;
