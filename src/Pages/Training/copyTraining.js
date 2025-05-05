import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createPersonalTraining,
  fetchOneTraining,
  fetchUsers,
} from "../../Services/routes";
import AlertFeedBack from "../../Assets/Components/alertFeedBack";
import LoadingDefault from "../../Assets/Components/loadingDefault";

const CopyTraining = ({ trainingId, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");
  const [trainingSelected, setTrainingSelected] = useState();
  const [users, setUsers] = useState();
  const [usersSelected, setUsersSelected] = useState([]);

  useEffect(() => {
    handleGetTraining();
  }, []);

  const handleGetTraining = async () => {
    setLoading(true);
    try {
      const response = await Promise.all([
        fetchOneTraining(trainingId),
        fetchUsers(),
      ]);
      response[0].Data = new Date()
      setTrainingSelected(response[0]);
      const newUser = [];
      response[1].docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newUser.push(newItem);
      });
      setUsers(newUser);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUsersSelected(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCopyTraining = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      usersSelected.map(async (user) => {
        const trainingForCopy = trainingSelected;
        trainingForCopy.userId = user;
        await createPersonalTraining(trainingForCopy);
      });
      setSeverity("success");
      setTitle("Treino copiado com sucesso!");
      setOpenAlert(true);
      setTimeout(()=>{
        setOpen(false);
      },2000)
    } catch (e) {
      console.log(e);
      setSeverity("error");
      setTitle("Erro ao copiar treino, tente novamente.");
      setOpenAlert(true);
    }
    setLoading(false);
  };
  
  return (
    <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Box
        component="form"
        onSubmit={handleCopyTraining}
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
          Copiando treino
        </Typography>
        {users && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label">Alunos</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={usersSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) =>
                  users
                    ?.filter((user) => selected.includes(user.id))
                    .map((user) => user.nome)
                    .join(', ')
                }
              >
                {users.map(
                  (user) =>
                    user.tipo === "personal" && (
                      <MenuItem key={user.id} value={user.id}>
                        <Checkbox checked={usersSelected.includes(user.id)} />
                        <ListItemText primary={user.nome} />
                      </MenuItem>
                    )
                )}
                <MenuItem value="turma">
                  <Checkbox checked={usersSelected.includes("turma")} />
                  <ListItemText primary="Turma" />
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
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
            Copiar
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

export default CopyTraining;
