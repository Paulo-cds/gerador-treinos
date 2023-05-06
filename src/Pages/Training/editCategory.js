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
import {
  changeCategory,
  changeExercise,
  fetchCategories,
} from "../../Services/routes";

const EditCategory = ({
  handleGetCategories,
  exerciseEdit,
  expanded,
  setExpanded,
  setTitle,
  setSeverity,
  setOpenSnack,
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: exerciseEdit.Nome,
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const data = {
        Nome: formik.values.nome,
      };
      try {
        await changeCategory(data, exerciseEdit.id);
        setTitle("Editado com sucesso!");
        setSeverity("success");
        setOpenSnack(true);
        setLoading(false);
        setExpanded(false);
        handleGetCategories();
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
        <DialogTitle>Editar Categoria</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              name="nome"
              value={formik.values.nome}
              label="Nome"
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

export default EditCategory;
