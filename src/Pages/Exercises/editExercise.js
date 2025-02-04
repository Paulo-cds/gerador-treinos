import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { changeExercise, fetchCategories, uploadVideo } from "../../Services/routes";

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
  const [upload, setUpload] = useState(false)
  const [fileUpload, setFileUpload] = useState()
  const fileInputRef = useRef();

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    if (upload) {
      const response = await uploadVideo(fileUpload)
      if (response.status === 'success') {
        formik.values.exemplo = response.url
        formik.handleSubmit()
      } else {
        setTitle("Erro ao subir vídeo, tente novamente.");
        setSeverity("error");
        setOpenSnack(true);
        setLoading(false);
      }
    } else formik.handleSubmit()
  }

  return (
    <>
      <Dialog
        open={expanded}
        onClose={handleChange}
        sx={{ p: 3 }}
        fullScreen
      >
        <DialogTitle>Editar Exercício</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              border: '1px solid black',
              borderRadius: '50%',
              p: '5px',
              cursor: 'pointer',
              width:'25px',
              height:'25px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
            onClick={handleChange}
          >
            X
          </Box>
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
                      disabled={loading}
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
              <Button onClick={() => { setUpload(!upload); fileUpload && setFileUpload() }} variant="outlined" disabled={loading}>
                {!upload ? 'Vídeo' : "Link"}
              </Button>
              <Button variant="contained" type="submit" disabled={loading} >
                {!loading ? 'Salvar' : 'Salvando...'}
              </Button>
            </Box>
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
