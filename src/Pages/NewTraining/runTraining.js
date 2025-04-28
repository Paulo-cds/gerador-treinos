import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { createPersonalTraining } from "../../Services/routes";
import AlertFeedBack from "../../Assets/Components/alertFeedBack";
import LoadingDefault from "../../Assets/Components/loadingDefault";

const RunTraining = ({
  users,
}) => {
  const [loading, setLoading] = useState(false);
  const options = { timeZone: "America/Sao_Paulo" };
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");

  const formik = useFormik({
    initialValues: {
      data: new Date(),
      type: "",
      personal: "",
      observation: "",
      title: "",
      finalizabled: true,
      linkVideo: "",
      linkVideoFinish: "",
      warmUp: "",
      training: "",
      finalTraining: "",
    },
    validationSchema: yup.object({
      training: yup.string(),
      observation: yup.string(),
      data: yup.date().required("O campo é obrigatório."),
      type: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const prev = values.data;
        prev.setDate(prev.getDate());
        const viewData = prev.toLocaleDateString("pt-BR", options);
        let newTraining = [];
        const trainingGer = {
          Aquecimento: values.warmUp,
          Data: viewData,
          Observacao: values.observation,
          Tipo: "corrida",
          Finalizado: false,
          Titulo: values.title,
          Finalizavel: values.finalizabled,
          Exemplo: values.linkVideo,
          ExemploFinal: values.linkVideoFinish,
          Treino: values.training,
          FinalizacaoTreino: values.finalTraining,
        };
        newTraining.push(trainingGer);
        try {
          trainingGer.userId =
            values.type === "personal" ? formik.values.personal.id : "turma";
          await createPersonalTraining(trainingGer);
          formik.resetForm();
          setSeverity("success");
          setTitle("Treino salvo com sucesso!");
          setOpenAlert(true);
        } catch (e) {
          console.log(e);
          setSeverity("error");
          setTitle("Erro ao salvar treino, tente novamente.");
          setOpenAlert(true);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.type}
          label="type"
          name="type"
          onChange={formik.handleChange}
        >
          <MenuItem value={"turma"}>Turma</MenuItem>
          <MenuItem value={"personal"}>Personal</MenuItem>
        </Select>
      </FormControl>
      {formik.values.type === "personal" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Aluno</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.personal.nome}
            label="personal"
            name="personal"
            onChange={formik.handleChange}
            displayEmpty
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: "auto",
                },
              },
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
          >
            {users.map(
              (user, index) =>
                user.tipo === "personal" && (
                  <MenuItem key={index} value={user}>
                    {user.nome}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}
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
        flexDirection={{
          xs: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
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
  );
};

export default RunTraining;
