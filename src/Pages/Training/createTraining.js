import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { addCategory, addTraining } from "../../Services/routes";
import "./styleTraining.css";

const CreateTraining = ({
  expanded,
  setExpanded,
  metods,
  trainings,
  exercises,
  handleGetTrainings,
}) => {
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

  const formik = useFormik({
    initialValues: {
      numero: "",
      ativacao: "",
    },
    validationSchema: yup.object({
      numero: yup.number().required("O campo é obrigatório."),
      ativacao: yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        //gerando método
        setAtivacao(formik.values.ativacao);
        let notMetod = true;
        let qtdExe = 0;
        while (notMetod) {
          let sortMet = Math.floor(Math.random() * metods.length);
          const verificMet = trainings.Treinos.find(
            (tr) => tr.metodo === metods[sortMet].nome
          );

          if (!verificMet) {
            setMtTreino(metods[sortMet].nome);
            qtdExe = metods[sortMet].quantidade;
            notMetod = false; // saia do laço quando a sentença for falsa
          }
        }
        // final gerando método

        //gerando aquecimento
        let notAqc = true;
        let exeAqc = [];
        while (notAqc) {
          let sortAqc = Math.floor(Math.random() * exercises.length);
          // const verificAqc = trainings.find(
          //   (tr) => tr.aquecimento === exercises[sortAqc].nome
          // );

          let exists = trainings.Treinos.some((train) =>
            train.Exercicios.some((exe) => exe.nome === exercises[sortAqc].nome)
          );
          exists = exeAqc.some((exe) => exe.nome === exercises[sortAqc].nome);

          if (!exists && exercises[sortAqc].categoria === "Aquecimento") {
            exeAqc.push({ exercicio: exercises[sortAqc].nome, reps: "0" });
            // qtdExe = metods[sortAqc].quantidade;
            if (exeAqc.length == formik.values.numero) {
              notAqc = false; // saia do laço quando a sentença for falsa
              setAquecimento(exeAqc);
            }
          }
        }
        //final gerando aquecimento

        //gerando exercicios
        let notExe = true;
        let exeTrn = [];
        while (notExe) {
          let sortExe = Math.floor(Math.random() * exercises.length);
          // const verificAqc = trainings.find(
          //   (tr) => tr.aquecimento === exercises[sortAqc].nome
          // );

          let exists = trainings.Treinos.some((train) =>
            train.Exercicios.some((exe) => exe.nome === exercises[sortExe].nome)
          );
          exists = exeTrn.some((exe) => exe.nome === exercises[sortExe].nome);

          if (!exists && exercises[sortExe].categoria !== "Aquecimento") {
            exeTrn.push({ exercicio: exercises[sortExe].nome, reps: "0" });
            // qtdExe = metods[sortAqc].quantidade;
            if (exeTrn.length == qtdExe) {
              notExe = false; // saia do laço quando a sentença for falsa
              setExeTreino(exeTrn);
            }
          }
        }
        //final gerando exercicios

        // const newTraining = {
        //   Aquecimento: aquecimento,
        //   Ativacao: ativacao,
        //   Data: new Date().toLocaleDateString(),
        //   Exercicios: exeTreino,
        //   Metodo: mtTreino,
        // };
        // if (trainings.Treinos.length >= 5) {
        //   trainings.Treinos.shift();
        // }
        setGerated(true);

        // setTrainingGerated(newTraining);

        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
  });

  const handleSaveTraining = async () => {
    setLoading(true);
    let newTraining = [];
    const trainingGer = {
      RoundsAqc: roundsAqc,
      RoundsTraining: roundsTraining,
      Aquecimento: aquecimento,
      Ativacao: ativacao,
      Data: new Date().toLocaleDateString(),
      Exercicios: exeTreino,
      Metodo: mtTreino,
    };
    newTraining.push(trainingGer);
    console.log("new ", newTraining[0]);
    if (trainings.Treinos.length >= 5) {
      trainings.Treinos.pop();
    }
    const heaveTraining = trainings.Treinos.find(
      (exe) => exe.Data === newTraining[0].Data
    );
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
        setExpanded(false);
        handleGetTrainings();
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const handleChange = () => {
    setExpanded(!expanded);
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

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          O treino de hoje já foi gerado!
        </Alert>
      </Snackbar>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{ mb: 2 }}
        className="container"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: 1, flexShrink: 0 }}>
            Gerar novo treino
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
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
                {aquecimento.map((exe, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography sx={{ width: "70%" }}>
                      {exe.exercicio}
                    </Typography>
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
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography sx={{ width: "70%" }}>
                      {exe.exercicio}
                    </Typography>
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
        </AccordionDetails>
      </Accordion>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateTraining;
