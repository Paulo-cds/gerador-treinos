import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { addExercise, addMetod, fetchCategories } from "../../Services/routes";

const CreateMetods = ({ handleGetMetods, expanded, setExpanded }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      nome: "",
      quantidade: "",
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      quantidade: yup.number().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await addMetod(values);
        setLoading(false);
        formik.resetForm();
        setExpanded(false);
        handleGetMetods();
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
  });

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
            Cadastrar Método
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
              name="nome"
              value={formik.values.nome}
              label="Nome"
              onChange={formik.handleChange}
            />
            <TextField
              name="quantidade"
              value={formik.values.quantidade}
              label="Quantidade exercicios"
              onChange={formik.handleChange}
            />
            <Button variant="contained" type="submit">
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

export default CreateMetods;
