import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { addRunningTraining } from "../../../Services/routes";
import "./styleTrainingRunning.css";

const CreateRunning = ({ expanded, setExpanded, handleGetTrainings }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const options = { timeZone: "America/Sao_Paulo" };

  const formik = useFormik({
    initialValues: {
      data: new Date().toLocaleDateString("pt-BR"),
      training: "",
      point: ''
    },
    validationSchema: yup.object({
      training: yup.string().required("O campo é obrigatório."),
      data: yup.date().required("O campo é obrigatório."),
      point: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const prev = new Date(values.data);
        prev.setDate(prev.getDate() + 1);
        const viewData = prev.toLocaleDateString("pt-BR", options);
        const data = {
          Data: viewData,
          Treino: values.training,
          Encontro:values.point
        };
        await addRunningTraining(data);

        setLoading(false);
        handleGetTrainings()
        setExpanded(false);
        formik.resetForm();
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
  });

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
              name="data"
              value={formik.values.data}
              label="Data"
              type="date"
              onChange={formik.handleChange}
            />
            <TextField
              name="training"
              value={formik.values.training}
              label="Descrição"
              onChange={formik.handleChange}
            />
            <TextField
              name="point"
              value={formik.values.point}
              label="Ponto de encontro"
              onChange={formik.handleChange}
            />
            <Button type="submit" variant="contained">
              Salvar
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

export default CreateRunning;
