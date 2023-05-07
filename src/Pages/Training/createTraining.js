import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { addCategory, addTraining } from "../../Services/routes";

const CreateTraining = ({
  expanded,
  setExpanded,
  metods,
  trainings,
  exercises,
}) => {
  const [loading, setLoading] = useState(false);
  const [aquecimento, setAquecimento] = useState([]);
  const [treino, setTreino] = useState([]);
  const [mtTreino, setMtTreino] = useState("");
  const [exeTreino, setExeTreino] = useState([]);

  const formik = useFormik({
    initialValues: {
      numero: "",
    },
    validationSchema: yup.object({
      numero: yup.number().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        //gerando método
        let notMetod = true;
        let qtdExe = 0;
        while (notMetod) {
          let sortMet = Math.floor(Math.random() * metods.length);
          const verificMet = trainings.find(
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

          let exists = trainings.some((train) =>
            train.exercicios.some((exe) => exe === exercises[sortAqc].nome)
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

          let exists = trainings.some((train) =>
            train.exercicios.some((exe) => exe === exercises[sortExe].nome)
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
          aquecimento,
          data: new Date().toLocaleDateString(),
          exercicios: exeTreino,
          metodo: mtTreino,
        };

        await addTraining(newTraining);

        setLoading(false);
        formik.resetForm();
        setExpanded(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        console.log("nao rodou");
      }
    },
  });
  console.log("metodo ", mtTreino);
  console.log("aquecimento ", aquecimento);
  console.log("exercicios ", exeTreino);
  console.log("exes ", trainings);
  const handleClose = () => {
    setLoading(false);
  };

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange} sx={{ mb: 2 }}>
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
            <Button variant="contained" type="submit">
              Gerar
            </Button>
          </Box>
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
