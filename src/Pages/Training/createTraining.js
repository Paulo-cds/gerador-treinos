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
            train.Exercicios.some((exe) => exe === exercises[sortAqc].nome)
          );
          exists = exeAqc.some((exe) => exe === exercises[sortAqc].nome);

          if (!exists && exercises[sortAqc].categoria === "Aquecimento") {
            exeAqc.push(exercises[sortAqc].nome);
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
            train.Exercicios.some((exe) => exe === exercises[sortExe].nome)
          );
          exists = exeTrn.some((exe) => exe === exercises[sortExe].nome);

          if (!exists && exercises[sortExe].categoria !== "Aquecimento") {
            exeTrn.push(exercises[sortExe].nome);
            // qtdExe = metods[sortAqc].quantidade;
            if (exeTrn.length == qtdExe) {
              notExe = false; // saia do laço quando a sentença for falsa
              setExeTreino(exeTrn);
            }
          }
        }
        //final gerando exercicios

        const newTraining = {
          Aquecimento: aquecimento,
          Ativacao: ativacao,
          Data: new Date().toLocaleDateString(),
          Exercicios: exeTreino,
          Metodo: mtTreino,
        };
        if (trainings.Treinos.length >= 5) {
          trainings.Treinos.shift();
        }

        setTrainingGerated(newTraining);

        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
  });

  const handleSaveTraining = async () => {
    setLoading(true);
    const heaveTraining = trainings.Treinos.find(
      (exe) => exe.Data === trainingGerated.Data
    );
    if (heaveTraining) {
      setOpen(true);
      setLoading(false);
    } else {
      try {
        trainings.Treinos.push(trainingGerated);
        await addTraining(trainings, trainings.id);
        setTrainingGerated();
        formik.resetForm();
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
                {!trainingGerated ? "Gerar" : "Gerar novo"}
              </Button>
              {trainingGerated && (
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
          {trainingGerated && (
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
                <Typography>{trainingGerated.Metodo}</Typography>
              </Box>
              <Box sx={{ borderTop: "1px solid black" }}>
                <Typography variant="h6">Aquecimento</Typography>
                {trainingGerated.Aquecimento.map((exe) => (
                  <Typography>{exe}</Typography>
                ))}
              </Box>
              <Box sx={{ borderTop: "1px solid black" }}>
                <Typography variant="h6">Ativação Neural</Typography>
                <Typography>{ativacao}</Typography>
              </Box>
              <Box sx={{ borderTop: "1px solid black" }}>
                <Typography variant="h6">Exercícios</Typography>
                {trainingGerated.Exercicios.map((exe) => (
                  <Typography>{exe}</Typography>
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
