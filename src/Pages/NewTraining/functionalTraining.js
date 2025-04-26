import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Switch,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { createPersonalTraining } from "../../Services/routes";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Player from "../../Assets/Player";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { backdropHeaderTable } from "../../Assets/colors";
import AlertFeedBack from "../../Assets/Components/alertFeedBack";
import LoadingDefault from "../../Assets/Components/loadingDefault";

const FunctionalTraining = ({
  users,
  exercises,
  optionsChange,
  trainings,
}) => {
  const [loading, setLoading] = useState(false);
  const [aquecimento, setAquecimento] = useState([]);
  const [exeTreino, setExeTreino] = useState([]);
  const [ativacao, setAtivacao] = useState("");
  const [gerated, setGerated] = useState(false);
  const [roundsAqc, setRoundsAqc] = useState("0");
  const [roundsTraining, setRoundsTraining] = useState("0");
  const options = { timeZone: "America/Sao_Paulo" };
  const [openPlayer, setOpenPlayer] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");

  const formik = useFormik({
    initialValues: {
      numero: "",
      qtdExercicios: "",
      ativacao: "",
      data: new Date(),
      type: "",
      personal: "",
      observation: "",
      title: "",
      finalizabled: true,
      // metodo: "",
    },
    validationSchema: yup.object({
      numero: yup.number().required("O campo é obrigatório."),
      qtdExercicios: yup.number().required("O campo é obrigatório."),
      ativacao: yup.string(),
      observation: yup.string(),
      data: yup.date().required("O campo é obrigatório."),
      type: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        //gerando método
        setAtivacao(formik.values.ativacao);
        // let notMetod = true;
        // let qtdExe = 0;
        // if (trainings) {
        //   let controlLength = 0
        //   while (notMetod) {
        //     let sortMet = Math.floor(Math.random() * metods.length);
        //     const verificMet = trainings.Treinos.find(
        //       (tr) => tr.Metodo === metods[sortMet].nome
        //     );

        //     if (!verificMet || controlLength >= metods.length) {
        //       setMtTreino(metods[sortMet].nome);
        //       qtdExe = metods[sortMet].quantidade;
        //       notMetod = false; // saia do laço quando a sentença for falsa
        //     }
        //     controlLength++
        //   }
        // } else {
        //   let sortMet = Math.floor(Math.random() * metods.length);
        //   qtdExe = metods[sortMet].quantidade;
        //   setMtTreino(metods[sortMet].nome);
        // }

        // final gerando método

        //gerando aquecimento
        let notAqc = true;
        let exeAqc = [];
        if (trainings) {
          while (notAqc) {
            let sortAqc = Math.floor(Math.random() * exercises.length);

            let exists = (
              trainings.Treinos ? trainings.Treinos : trainings
            ).some(
              (train, index) =>
                index <= 4 &&
                train.Exercicios.some(
                  (exe) => exe.exercicio === exercises[sortAqc].nome
                )
            );

            let sorted = exeAqc.some(
              (exe) => exe.exercicio === exercises[sortAqc].nome
            );

            if (
              !exists &
              !sorted &
              (exercises[sortAqc].categoria === "Aquecimento")
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
            if (!sorted & (exercises[sortAqc].categoria === "Aquecimento")) {
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

            let exists = (
              trainings.Treinos ? trainings.Treinos : trainings
            ).some(
              (train, index) =>
                index <= 5 &&
                train.Exercicios.some(
                  (exe) => exe.exercicio === exercises[sortExe].nome
                )
            );

            let sorted = exeTrn.some(
              (exe) => exe.exercicio === exercises[sortExe].nome
            );

            if (
              !exists &
              !sorted &
              (exercises[sortExe].categoria !== "Aquecimento")
            ) {
              exeTrn.push({
                exercicio: exercises[sortExe].nome,
                reps: "0",
                exemplo: exercises[sortExe].exemplo,
                id: exercises[sortExe].id,
              });
              // qtdExe = metods[sortAqc].quantidade;
              if (exeTrn.length == parseInt(formik.values.qtdExercicios)) {
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
            if (!sorted & (exercises[sortExe].categoria !== "Aquecimento")) {
              exeTrn.push({
                exercicio: exercises[sortExe].nome,
                reps: "0",
                exemplo: exercises[sortExe].exemplo,
                id: exercises[sortExe].id,
              });

              if (exeTrn.length == parseInt(formik.values.qtdExercicios)) {
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

  const handleSaveTraining = async () => {
    setLoading(true);
    const prev = formik.values.data;
    prev.setDate(prev.getDate());
    const viewData = prev.toLocaleDateString("pt-BR", options);
    let newTraining = [];
    const trainingGer = {
      RoundsAqc: roundsAqc,
      RoundsTraining: roundsTraining,
      Aquecimento: aquecimento,
      Ativacao: ativacao,
      Data: viewData,
      Exercicios: exeTreino,
      Observacao: formik.values.observation,
      Tipo: "funcional",
      Finalizado: false,
      Titulo: formik.values.title,
      Finalizavel: formik.values.finalizabled,
    };
    newTraining.push(trainingGer);
    try {
      trainingGer.userId =
        formik.values.type === "personal" ? formik.values.personal.id : "turma";
      await createPersonalTraining(trainingGer);
      formik.resetForm();
      setRoundsAqc("0");
      setRoundsTraining("0");
      setGerated(false);
      setSeverity("success");
      setTitle("Treino salvo com sucesso!");
      setOpenAlert(true);
    } catch (e) {
      console.log(e);
      setSeverity("error");
      setTitle("Erro ao salvar treino, tente novamente.");
      setOpenAlert(true);
    }
    setLoading(false);
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
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        <Player open={openPlayer} setOpen={setOpenPlayer} link={linkVideo} />
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
              value={formik.values.personal.nome}
              label="personal"
              name="personal"
              onChange={formik.handleChange}
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
              {users.map(
                (user, index) =>
                  user.tipo === "personal" && (
                    <MenuItem key={index} value={user}>
                      {user.nome}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
        )}
        <TextField
          name="title"
          value={formik.values.title}
          label="Título"
          onChange={formik.handleChange}
        />
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
        <TextField
          name="qtdExercicios"
          value={formik.values.qtdExercicios}
          label="Qtd exercícios treino"
          onChange={formik.handleChange}
        />
        {gerated && (
          <>
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
                                }}
                                onClick={() => handleSetVideo(exe.exemplo)}
                              />
                            )}
                          </Box>
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
                              {optionsChange.map((opt) =>
                                trainings
                                  ? opt.categoria === "Aquecimento" && (
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
                                  : opt.categoria === "Aquecimento" && (
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
                    <Box sx={{ width: "60%", display: "flex" }}>
                      <Box>
                        {exe.exemplo && (
                          <HelpOutlineIcon
                            sx={{
                              cursor: "pointer",
                              fontSize: "20px",
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
                          {optionsChange.map((opt) =>
                            trainings
                              ? opt.categoria !== "Aquecimento" && (
                                  <MenuItem value={opt}>{opt.nome}</MenuItem>
                                )
                              : opt.categoria !== "Aquecimento" && (
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
          </>
        )}
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
      <AlertFeedBack
        open={openAlert}
        setOpen={setOpenAlert}
        title={title}
        severity={severity}
      />
      <LoadingDefault open={loading} />
    </>
  );
};

export default FunctionalTraining;
