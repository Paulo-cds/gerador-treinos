import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
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
import { useEffect, useState } from "react";
import { addExercise, addUser, fetchCategories } from "../../Services/routes";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const CreateUser = ({ expanded, setExpanded, handleGetUsers }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const auth = getAuth();

  const formik = useFormik({
    initialValues: {
      nome: "",
      password:'',
      email: "@correndodosofa.com.br",
      isAdmin: false,
    },
    validationSchema: yup.object({
      email: yup.string().required("O campo é obrigatório."),
      nome: yup.string().required("O campo é obrigatório."),
      password: yup.string().required("O campo é obrigatório."),
      isAdmin: yup.boolean().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
        .then((value) => {
          handleUser(value.user.uid);
        })
        .catch((error) => {
          console.log("Erro ao cadastrar: " + error);
          setLoading(false);
          // if(error.code === 'auth/weak-password'){
          //   setTitle('Senha precisa ter pelo menos 6 caracteres!')
          //   setAlert(true)
          //   setLoading(false)
          // } else if(error.code === 'auth/email-already-in-use'){
          //   setTitle('Email já existe!')
          //   setAlert(true)
          //   setLoading(false)
          // } else if(error.code === 'auth/invalid-email'){
          //   setTitle('Email inválido!')
          //   setAlert(true)
          //   setLoading(false)
          // }
        });
    },
  });

  const handleUser = async (uid) => {
    const response = await addUser(
      formik.values.email,
      uid,
      formik.values.nome,
      formik.values.isAdmin
    );
    if (response.status === 200) {
      setLoading(false);
      setExpanded(false);
      handleGetUsers();
      // setAlert(true)
      // setStatus('success')
      // setRegisterUser(!registerUser)
      // setForm(initialState)
      // getUsers()
    } else {
      setLoading(false);
      // setTitle("Erro ao cadastrar, verifique os dados e tente novamente.")
      // setAlert(true)
    }
  };

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

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Esse exercicio já foi cadastrado!
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
            Cadastrar Usuário
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
              name="email"
              value={formik.values.email}
              label="Email"
              onChange={formik.handleChange}
            />
            <TextField
              name="password"
              value={formik.values.password}
              label="Senha"
              type="password"
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

export default CreateUser;
