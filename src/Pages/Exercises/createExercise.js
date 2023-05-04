import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

const CreateExercise = ({ expanded, setExpanded }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      categoria: "",
      exemplo: "",
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      categoria: yup.string().required("O campo é obrigatório."),
      exemplo: yup.string(),
    }),
    onSubmit: async (values) => {
      //   setLoading(true)
      //   try {
      //     await editEmpresaAdminService(token, values, id)
      //     navigate('/AdmEmpresas')
      //   } catch (e) {
      //     console.log(e)
      //     setLoading(false)
      //   }
    },
  });

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const getCategories = async () => {};

  return (
    <Accordion expanded={expanded} onChange={handleChange} sx={{ mb: 2 }}>
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
        <Box component="form"></Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateExercise;
