import {
  Backdrop,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { editTrainingData, fetchOneTraining } from "../../Services/routes";
import AlertFeedBack from "../../Assets/Components/alertFeedBack";
import LoadingDefault from "../../Assets/Components/loadingDefault";

const EditRunTraining = ({ trainingId, open, setOpen, handleGetTrainings }) => {
  const [loading, setLoading] = useState(false);
  const options = { timeZone: "America/Sao_Paulo" };
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");

  const formik = useFormik({
    initialValues: {
      observation: "",
      title: "",
      finalizabled: true,
      finalized: false,
      linkVideo: "",
      linkVideoFinish: "",
      warmUp: "",
      training: "",
      finalTraining: "",
    },
    validationSchema: yup.object({
      training: yup.string().required("O campo é obrigatório."),
      observation: yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const prev = new Date();
        prev.setDate(prev.getDate());
        const viewData = prev.toLocaleDateString("pt-BR", options);
        const data = {
          Aquecimento: values.warmUp,
          Editado: viewData,
          Observacao: values.observation,
          Titulo: values.title,
          Finalizavel: values.finalizabled,
          Exemplo: values.linkVideo,
          ExemploFinal: values.linkVideoFinish,
          Treino: values.training,
          Finalizado: values.finalized,
          FinalizacaoTreino: values.finalTraining,
        };
        await editTrainingData(data, trainingId);
        setSeverity("success");
        setTitle("Treino editado com sucesso!");
        setOpenAlert(true);
        setOpen(false);
        handleGetTrainings();
      } catch (e) {
        console.log(e);
        setSeverity("error");
        setTitle("Erro ao editar treino, tente novamente.");
        setOpenAlert(true);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    handleGetTraining();
  }, []);

  const handleGetTraining = async () => {
    setLoading(true);
    try {
      const response = await fetchOneTraining(trainingId);
      formik.setFieldValue("observation", response.Observacao);
      formik.setFieldValue("title", response.Titulo);
      formik.setFieldValue("finalizabled", response.Finalizavel);
      formik.setFieldValue("finalized", response.Finalizado);
      formik.setFieldValue("linkVideo", response.Exemplo);
      formik.setFieldValue("linkVideoFinish", response.ExemploFinal ? response.ExemploFinal : "");
      formik.setFieldValue("warmUp", response.Aquecimento);
      formik.setFieldValue("training", response.Treino);
      formik.setFieldValue("finalTraining", response.FinalizacaoTreino ? response.FinalizacaoTreino : "");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          width: "500px",
          maxWidth: "90%",
          p: 2,
          borderRadius: "20px",
          maxHeight: "95%",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography variant="h5" color="black" sx={{ textAlign: "center" }}>
          Editando treino
        </Typography>
        <TextField
          name="title"
          value={formik.values.title}
          label="Título"
          onChange={formik.handleChange}
        />
        <TextField
          name="warmUp"
          value={formik.values.warmUp}
          label="Aquecimento"
          onChange={formik.handleChange}
          multiline
          rows={4}
        />
        <TextField
          name="linkVideo"
          value={formik.values.linkVideo}
          label="Link de vídeo"
          onChange={formik.handleChange}
        />
        <TextField
          name="training"
          value={formik.values.training}
          label="Treino principal"
          onChange={formik.handleChange}
          multiline
          rows={4}
        />
        <TextField
          name="finalTraining"
          value={formik.values.finalTraining}
          label="Finalização do treino"
          onChange={formik.handleChange}
          multiline
          rows={4}
        />
        <TextField
          name="linkVideoFinish"
          value={formik.values.linkVideoFinish}
          label="Link de finalização de treino"
          onChange={formik.handleChange}
        />
        <TextField
          name="observation"
          value={formik.values.observation}
          label="Observação"
          onChange={formik.handleChange}
          multiline
          rows={4}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.finalizabled}
                onChange={() =>
                  formik.setFieldValue(
                    "finalizabled",
                    !formik.values.finalizabled
                  )
                }
              />
            }
            label="Finalizável"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.finalized}
                onChange={() =>
                  formik.setFieldValue("finalized", !formik.values.finalized)
                }
              />
            }
            label="Finalizado"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
        <AlertFeedBack
          open={openAlert}
          setOpen={setOpenAlert}
          title={title}
          severity={severity}
        />
        <LoadingDefault open={loading} />
      </Box>
    </Backdrop>
  );
};

export default EditRunTraining;
