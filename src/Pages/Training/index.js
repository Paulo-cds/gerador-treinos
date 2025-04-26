import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TablePagination,
  styled,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  deleteTraining,
  fetchTrainings,
  fetchUsers,
} from "../../Services/routes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BackdropCategory from "../../Assets/Images/backdropExercises.webp";
import { backdropHeaderTable } from "../../Assets/colors";
import "./styleTraining.css";
import EditFunctionalTraining from "./editfunctionalTraining";
import LoadingDefault from "../../Assets/Components/loadingDefault";
import EditRunTraining from "./editRunTraining";
import AlertFeedBack from "../../Assets/Components/alertFeedBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewDetailTraining from "./viewDetailTraining";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyTraining from "./copyTraining";

const Training = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [trainings, setTrainings] = useState();
  const [trainingEdit, setTrainingEdit] = useState();
  const [users, setUsers] = useState([]);
  const [typeUser, setTypeUser] = useState("");
  const [personalSelected, setPersonalSelected] = useState("");
  const [openEditFuncional, setOpenEditFuncional] = useState(false);
  const [openEditCorrida, setOpenEditCorrida] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [alertCopy, setAlertCopy] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: backdropHeaderTable,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetTrainings = async (type) => {
    setLoading(true);
    try {
      const newTrainings = [];
      const response = await fetchTrainings(
        typeUser === "turma" ? "turma" : personalSelected
      );
      response.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newTrainings.push(newItem);
      });
      let control = newTrainings;
      control = control.sort((a, b) => {
        const dataA = new Date(a.Data.split("/").reverse().join("/"));
        const dataB = new Date(b.Data.split("/").reverse().join("/"));
        return dataB - dataA;
      });
      setTrainings(control);
    } catch (e) {
      setOpenSnack(true);
      setSeverity("error");
      setTitle("Ainda não existem treinos para o aluno selecionado!");
      console.log(e);
    }
    setLoading(false);
  };

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const newUser = [];
      const response = await fetchUsers();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newUser.push(newItem);
      });
      let control = newUser;
      setUsers(control);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setLoading(false);
    setOpenSnack(false);
    setOpen(false);
    setIdDelete();
  };

  const handleDeleteTraining = async () => {
    setLoading(true);
    try {
      await deleteTraining(idDelete);
      setOpen(false);
      setSeverity("success");
      setTitle("Treino deletado com sucesso!");
      setOpenAlert(true);
      handleGetTrainings();
    } catch (e) {
      console.log(e);
      setSeverity("error");
      setTitle("Erro ao deletar treino, tente novamente.");
      setOpenAlert(true);
    }
    setLoading(false);
  };

  const handleSelectTrainingEdit = (id, type) => {
    setTrainingEdit(id);
    if (type === "funcional") setOpenEditFuncional(true);
    if (type === "corrida") setOpenEditCorrida(true);
  };

  const handleSelectTrainingDelete = (id) => {
    setIdDelete(id);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        backgroundImage: `url(${BackdropCategory})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
    >
      <Box
        width={{ xs: "90%", sm: "90%", md: "60%" }}
        sx={{ height: "90%" }}
        ml={{ xs: 0, sm: 0, md: 4 }}
        mt={{ xs: 3, sm: 3, md: 0 }}
        className="containerIndexTraining"
      >
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Tem certeza que deseja excluir esse treino?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={() => handleDeleteTraining()}>Excluir</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {title}
          </Alert>
        </Snackbar>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeUser}
              label="type"
              name="type"
              onChange={(e) => setTypeUser(e.target.value)}
              sx={{ backgroundColor: "white" }}
            >
              <MenuItem value={"turma"}>Turma</MenuItem>
              <MenuItem value={"personal"}>Personal</MenuItem>
            </Select>
          </FormControl>
          {typeUser === "personal" && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Aluno</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={personalSelected}
                label="personal"
                name="personal"
                onChange={(e) => setPersonalSelected(e.target.value)}
                sx={{ backgroundColor: "white" }}
              >
                {users.map(
                  (user, index) =>
                    user.tipo === "personal" && (
                      <MenuItem key={index} value={user.id}>
                        {user.nome}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
          )}
          <Button variant="contained" onClick={() => handleGetTrainings()}>
            Buscar
          </Button>
        </Box>
        {trainings && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell>Data criação</StyledTableCell>
                  <StyledTableCell>Tipo</StyledTableCell>
                  <StyledTableCell>Título</StyledTableCell>
                  <StyledTableCell>Finalizado</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{ display: "flex", gap: 2 }}
                      >
                        <EditIcon
                          onClick={() =>
                            handleSelectTrainingEdit(row.id, row.Tipo)
                          }
                          sx={{ cursor: "pointer" }}
                        />
                        <DeleteIcon
                          onClick={() => handleSelectTrainingDelete(row.id)}
                          sx={{ cursor: "pointer" }}
                        />
                        <VisibilityIcon
                          onClick={() => {
                            setTrainingEdit(row.id);
                            setViewDetail(true);
                          }}
                          sx={{ cursor: "pointer" }}
                        />
                        <ContentCopyIcon
                         onClick={() => {
                          setTrainingEdit(row.id);
                          setAlertCopy(true);
                        }}
                        sx={{ cursor: "pointer" }}
                         />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.Data}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.Tipo}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.Titulo}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.Finalizado ? "Sim" : "Não"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={trainings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
        <AlertFeedBack
          open={openAlert}
          setOpen={setOpenAlert}
          title={title}
          severity={severity}
        />
        <LoadingDefault open={loading} />
      </Box>
      {openEditFuncional && (
        <EditFunctionalTraining
          open={openEditFuncional}
          setOpen={setOpenEditFuncional}
          trainingId={trainingEdit}
          handleGetTrainings={handleGetTrainings}
        />
      )}
      {openEditCorrida && (
        <EditRunTraining
          open={openEditCorrida}
          setOpen={setOpenEditCorrida}
          trainingId={trainingEdit}
          handleGetTrainings={handleGetTrainings}
        />
      )}
      {viewDetail && (
        <ViewDetailTraining
          open={viewDetail}
          setOpen={setViewDetail}
          trainingId={trainingEdit}
        />
      )}
      {alertCopy && (
        <CopyTraining
          open={alertCopy}
          setOpen={setAlertCopy}
          trainingId={trainingEdit}
        />
      )}
    </Box>
  );
};

export default Training;
