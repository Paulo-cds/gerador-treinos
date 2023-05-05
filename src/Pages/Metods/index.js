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
  TableFooter,
  TablePagination,
  TextField,
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
  deleteRenter,
  fetchExercises,
  fetchMetods,
} from "../../Services/routes";
import CreateExercise from "./createMetods";
import Player from "../../Assets/Player";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EditExercise from "./editExercise";
import CreateMetods from "./createMetods";

const Metods = () => {
  const [metods, setMetods] = useState([]);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
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
    handleGetMetods();
  }, []);

  const handleGetMetods = async () => {
    try {
      const newMetods = [];
      const response = await fetchMetods();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newMetods.push(newItem);
      });
      setMetods(newMetods);
    } catch (e) {
      console.log(e);
    }
  };

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
      handleGetMetods();
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
    <Box sx={{ width: "100%" }}>
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
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {title}
        </Alert>
      </Snackbar>
      <CreateMetods
        handleGetMetods={handleGetMetods}
        expanded={newRegister}
        setExpanded={setNewRegister}
      />
      {editRegister && (
        <EditExercise
          handleGetMetods={handleGetMetods}
          exerciseEdit={exerciseEdit}
          expanded={editRegister}
          setExpanded={setEditRegister}
          setTitle={setTitle}
          setSeverity={setSeverity}
          setOpenSnack={setOpenSnack}
        />
      )}

      <Player open={openPlayer} setOpen={setOpenPlayer} link={linkVideo} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Métodos</StyledTableCell>
              <StyledTableCell align="center">Qtd Exercicios</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metods.map((row) => (
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
                  {row.quantidade}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 25]}
          component="div"
          count={metods.length}
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
  );
};

export default Metods;
