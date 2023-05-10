import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  TablePagination,
  TextField,
  Typography,
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
import { deleteRenter, fetchExercises } from "../../Services/routes";
import CreateExercise from "./createExercise";
import Player from "../../Assets/Player";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EditExercise from "./editExercise";
import BackdropImage from "../../Assets/Images/backdropExercise.jpg";
import { backdropHeaderTable } from "../../Assets/colors";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [newRegister, setNewRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [textButton, setTextButton] = useState("");
  const [functionExecute, setFunctionExecute] = useState();
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [editRegister, setEditRegister] = useState(false);
  const [exerciseEdit, setExerciseEdit] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [backupExercises, setBackupExercises] = useState([]);
  const [searchExe, setSearchExe] = useState("");
  const [notSearch, setNotSearch] = useState(false);

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
    handleGetExercises();
  }, []);

  const handleGetExercises = async () => {
    try {
      const newExercises = [];
      const response = await fetchExercises();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newExercises.push(newItem);
      });
      setExercises(newExercises);
      setBackupExercises(newExercises);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setNotSearch(false);
    // console.log(searchExe);
    if (searchExe === "") {
      setExercises(backupExercises);
      return;
    }
    const filter = backupExercises.filter((exe) =>
      exe.nome.toLowerCase().includes(searchExe.toLocaleLowerCase())
    );

    if (filter.length > 0) {
      setExercises(filter);
    } else {
      setExercises(backupExercises);
      setNotSearch(true);
    }
  }, [searchExe]);

  const handleClose = () => {
    setLoading(false);
    setOpenSnack(false);
    setOpen(false);
  };

  const handleSetVideo = (link) => {
    setLinkVideo(link);
    setOpenPlayer(true);
  };

  const handleAlertDelete = (id) => {
    setIdDelete(id);
    setTextButton("Ok");
    setTitle("Tem certeza que deseja excluir esse exercício?");
    setFunctionExecute("delete");
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    if (functionExecute === "delete") {
      deleteExercicio();
    }
  };

  const deleteExercicio = async () => {
    setLoading(true);
    try {
      await deleteRenter(idDelete);
      setTitle("Exercício deletado com sucesso!");
      setSeverity("success");
      setOpenSnack(true);
      setLoading(false);
      handleGetExercises();
    } catch (e) {
      console.log(e);
      setTitle("Erro ao deletar, tente novamente");
      setSeverity("error");
      setOpenSnack(true);
      setLoading(false);
    }
  };

  const handleSelectEdit = (item) => {
    setExerciseEdit(item);
    setEditRegister(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        backgroundImage: `url(${BackdropImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      alignItems={{ xs: "center", sm: "center", md: "flex-end" }}
    >
      <Box
        sx={{
          height: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        width={{ xs: "90%", sm: "90%", md: "60%" }}
        mr={{ xs: 0, sm: 0, md: 4 }}
        mt={{ xs: 3, sm: 3, md: 0 }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={() => handleOk()} autoFocus>
              {textButton}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
          message={title}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {title}
          </Alert>
        </Snackbar>
        <CreateExercise
          handleGetExercises={handleGetExercises}
          expanded={newRegister}
          setExpanded={setNewRegister}
          exercises={exercises}
        />
        {editRegister && (
          <EditExercise
            handleGetExercises={handleGetExercises}
            exerciseEdit={exerciseEdit}
            expanded={editRegister}
            setExpanded={setEditRegister}
            setTitle={setTitle}
            setSeverity={setSeverity}
            setOpenSnack={setOpenSnack}
          />
        )}

        <Box
          sx={{
            mb: 1,
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <TextField
            type="text"
            label="Procurar exercício"
            value={searchExe}
            error={notSearch}
            onChange={(e) => setSearchExe(e.target.value)}
            helperText={notSearch ? "Exercício não encontrado" : ""}
            sx={{ backgroundColor: "white" }}
          />
        </Box>

        <Player open={openPlayer} setOpen={setOpenPlayer} link={linkVideo} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Exercício</StyledTableCell>
                <StyledTableCell align="center">Categoria</StyledTableCell>
                <StyledTableCell align="center">Exemplo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ cursor: "pointer" }}
                    >
                      <DeleteForeverIcon
                        onClick={() => handleAlertDelete(row.id)}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ cursor: "pointer" }}
                    >
                      <EditIcon onClick={() => handleSelectEdit(row)} />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.nome}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.categoria}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleSetVideo(row.exemplo)}
                      align="center"
                    >
                      {row.exemplo}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={exercises.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Box>
  );
};

export default Exercises;
