import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { changeTrainingData } from "../../Services/routes";

const EditTraining = ({
  expanded,
  setExpanded,
  trainingEdit,
  setFormTraining,
  trainings,
  handleGetTrainings,
  setTitle,
  setOpenSnack,
  setSeverity,
}) => {
  const [loading, setLoading] = useState(false);
  const moment = require("moment");
  const options = { timeZone: "America/Sao_Paulo" };

  const formik = useFormik({
    initialValues: {
      data: moment(trainings.Treinos[trainingEdit].Data, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),
    },
    validationSchema: yup.object({
      data: yup.date().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      const newData = values.data;
      trainings.Treinos[trainingEdit].Data = moment(
        newData,
        "YYYY-MM-DD"
      ).format("DD/MM/YYYY");

      const data = trainings.Treinos;

      setLoading(true);
      try {
        await changeTrainingData(data, trainings.id);
        setFormTraining("create");
        setExpanded(false);
        setLoading(false);
        setTitle("Treino editado com sucesso!");
        setSeverity("success");
        setOpenSnack(true);
        handleGetTrainings();
      } catch (e) {
        console.log(e);
        setTitle("Ocorreu algum erro!");
        setSeverity("error");
        setOpenSnack(true);
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
            Editar data do treino
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
              alignItems: "center",
            }}
          >
            <Box>
              <TextField
                name="data"
                value={formik.values.data}
                label="Data"
                type="date"
                onChange={formik.handleChange}
              />
            </Box>
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

export default EditTraining;
