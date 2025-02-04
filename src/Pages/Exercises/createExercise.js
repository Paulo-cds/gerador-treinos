import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { addExercise, fetchCategories, uploadVideo } from "../../Services/routes";

const CreateExercise = ({
  handleGetExercises,
  expanded,
  setExpanded,
  exercises,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState(false)
  const [fileUpload, setFileUpload] = useState()
  const [severity, setSeverity] = useState('success')
  const [title, setTitle] = useState("")
  const fileInputRef = useRef();

  const formik = useFormik({
    initialValues: {
      nome: "",
      categoria: "",
      exemplo: "",
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      categoria: yup.string().required("O campo é obrigatório."),
      exemplo: yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const heaveExercise = exercises.find(
        (exe) => exe.nome.toLowerCase() === formik.values.nome.toLowerCase()
      );
      if (heaveExercise) {
        setSeverity('error')
        setTitle("Esse exercicio já foi cadastrado!")
        setOpen(true);
        setLoading(false);
      } else {
        try {
          await addExercise(values);
          setSeverity('success')
          setTitle("Exercicio cadastrado com sucesso!")
          setOpen(true);
          setLoading(false);
          formik.resetForm();
          setExpanded(false);
          handleGetExercises();
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    if (upload) {
      const response = await uploadVideo(fileUpload)
      if (response.status === 'success') {
        formik.values.exemplo = response.url
        formik.handleSubmit()
      } else {
        setSeverity('error')
        setTitle("Erro ao subir vídeo, tente novamente.")
        setOpen(true);
        setLoading(false);
      }
    } else formik.handleSubmit()
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {title}
        </Alert>
      </Snackbar>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{ mb: 2, width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: 1, flexShrink: 0 }}>
            Cadastrar Exercício
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
            <InputLabel>Categoria</InputLabel>
            <Select
              sx={{ mt: 0 }}
              name="categoria"
              value={formik.values.categoria}
              onChange={formik.handleChange}
              label="Categoria"
            >
              {categories.map((category) => (
                <MenuItem value={category.Nome}>{category.Nome}</MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >

              {
                upload && fileUpload &&
                <video width="320" height="240" controls>
                  <source src={URL.createObjectURL(fileUpload)} />
                </video>
              }
              {
                upload ?
                  <Box>
                    <input
                      type="file"
                      accept="video/mp4,video/mkv, video/x-m4v,video/*"
                      id="arquivo"
                      required
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => setFileUpload(e.target.files[0])}
                    />

                    <Button
                      onClick={e => fileInputRef.current.click()}
                      variant="outlined"
                    >
                      {fileUpload ? "Alterar vídeo" : "Inserir vídeo"}
                      </Button>
                  </Box>
                  :
                  <TextField
                    name="exemplo"
                    value={formik.values.exemplo}
                    label="Exemplo"
                    onChange={formik.handleChange}
                    fullWidth
                  />
              }
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button onClick={() => { setUpload(!upload); fileUpload && setFileUpload() }} variant="outlined" >
                {!upload ? 'Vídeo' : "Link"}
              </Button>
              <Button variant="contained" type="submit">
                Salvar
              </Button>
            </Box>
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

export default CreateExercise;
