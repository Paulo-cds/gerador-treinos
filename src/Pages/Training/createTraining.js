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
import { addCategory } from "../../Services/routes";

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
  const [exeTreino, setExeTreino] = useState([])

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
        let notMetod = true;
        let qtdExe = 0
        while (notMetod) {
          let sortMet = Math.floor(Math.random() * metods.length);
          const verificMet = trainings.find(
            (tr) => tr.metodo === metods[sortMet].nome
          );

          if (!verificMet) {
            setMtTreino(metods[sortMet].nome);
            console.log('mtd while ', metods[sortMet].nome)
            qtdExe = metods[sortMet].quantidade
            notMetod = false; // saia do laço quando a sentença for falsa
          }
        }

        let notComplet = true;
        let newExercises = [];
        
        while (notComplet) {
          console.log('2while')
          let sortExe = Math.floor(Math.random() * exercises.length);
          let verificMet = trainings.find(
            (tr) => tr.exercicios === exercises[sortExe]
          );
          console.log('ver 1', verificMet)
          verificMet = newExercises.find(
            (tr) => tr.exercicios === exercises[sortExe]
          );
          console.log('ver 2', verificMet)
          if (!verificMet) {
            newExercises.push(exercises[sortExe]);

            if(newExercises.length === qtdExe){
              setExeTreino(newExercises);
              console.log('exe while ',newExercises)
              notComplet = false; // saia do laço quando a sentença for falsa

            }
          }
        }

        setLoading(false);
        formik.resetForm();
        // setExpanded(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        console.log('nao rodou')
      }
    },
  });
  console.log('metodo ', mtTreino)
  console.log('exercicios ', exeTreino)
  console.log('exes ', trainings)
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
