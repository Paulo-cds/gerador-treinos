import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
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
import { changeExercise, changeMetod, fetchCategories } from "../../Services/routes";

const EditMetod = ({
  handleGetMetods,
  metodEdit,
  expanded,
  setExpanded,
  setTitle,
  setSeverity,
  setOpenSnack,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      nome: metodEdit.nome,
      quantidade: metodEdit.quantidade,
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      quantidade: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await changeMetod(values, metodEdit.id);
        setTitle("Editado com sucesso!");
        setSeverity("success");
        setOpenSnack(true);
        setLoading(false);
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
      <Dialog
        open={expanded}
        onClose={handleChange}
        sx={{ p: 3 }}
        // maxWidth="xl"
      >
        <DialogTitle>Editar Método</DialogTitle>
        <DialogContent sx={{mt:1}}>
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
              sx={{mt:1}}
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
        </DialogContent>
      </Dialog>
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

export default EditMetod;
