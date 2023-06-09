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
import { changeExercise, fetchCategories } from "../../Services/routes";

const EditExercise = ({
  handleGetExercises,
  exerciseEdit,
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
      nome: exerciseEdit.nome,
      categoria: exerciseEdit.categoria,
      exemplo: exerciseEdit.exemplo,
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      categoria: yup.string().required("O campo é obrigatório."),
      exemplo: yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await changeExercise(values, exerciseEdit.id);
        setTitle("Editado com sucesso!");
        setSeverity("success");
        setOpenSnack(true);
        setLoading(false);
        setExpanded(false);
        handleGetExercises();
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleClose = () => {
    setLoading(false);
  };

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      let newCategory = [];
      const response = await fetchCategories();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newCategory.push(newItem);
      });
      setCategories(newCategory);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={expanded}
        onClose={handleChange}
        sx={{ p: 3 }}
        // maxWidth="xl"
      >
        <DialogTitle>Editar Exercício</DialogTitle>
        <DialogContent>
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
            <Select
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
              label="Categoria"
            >
              {categories.map((category) => (
                <MenuItem value={category.Nome}>{category.Nome}</MenuItem>
              ))}
            </Select>
            <TextField
              name="exemplo"
              value={formik.values.exemplo}
              label="Exemplo"
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

export default EditExercise;
