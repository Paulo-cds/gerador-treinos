import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  Snackbar,
  Tab,
  TablePagination,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  deleteCategory,
  deleteRenter,
  fetchCategories,
  fetchExercises,
  fetchMetods,
  fetchTrainings,
} from "../../Services/routes";
import Player from "../../Assets/Player";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EditExercise from "./editCategory";
import CreateCategory from "./createTraining";
import EditCategory from "./editCategory";
import BackdropCategory from "../../Assets/Images/backdropExercises.webp";
import CreateTraining from "./createTraining";
import { backdropHeaderTable } from "../../Assets/colors";
import Corrida from "./Corrida";
import "./styleTraining.css";

const Training = () => {
  const [categories, setCategories] = useState([]);
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

  const [metods, setMetods] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [trainings, setTrainings] = useState();
  const [typeTraining, setTypeTraining] = useState("");

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
    handleGetMetods();
    handleGetExercises();
    handleGetTrainings();
  }, []);

  const handleGetTrainings = async () => {
    try {
      const newTrainings = [];
      const response = await fetchTrainings();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newTrainings.push(newItem);
      });
      let control = newTrainings[0];
      control.Treinos = control.Treinos.sort((a, b) => {
        const dataA = new Date(a.Data.split("/").reverse().join("/"));
        const dataB = new Date(b.Data.split("/").reverse().join("/"));
        return dataB - dataA;
      });      
      setTrainings(control);
    } catch (e) {
      console.log(e);
    }
  };

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
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetMetods = async () => {
    setLoading(true);
    try {
      const newMetods = [];
      const response = await fetchMetods();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newMetods.push(newItem);
      });
      setMetods(newMetods);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setLoading(false);
    setOpenSnack(false);
    setOpen(false);
  };

  const handleAlertDelete = (id) => {
    setIdDelete(id);
    setTextButton("Ok");
    setTitle("Tem certeza que deseja excluir essa categoria?");
    setFunctionExecute("delete");
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    if (functionExecute === "delete") {
      deleteCategoria();
    }
  };

  const deleteCategoria = async () => {
    setLoading(true);
    try {
      await deleteCategory(idDelete);
      setTitle("Categoria deletada com sucesso!");
      setSeverity("success");
      setOpenSnack(true);
      setLoading(false);
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

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const handleChange = (event, newValue) => {
    setTypeTraining(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            m: 2,
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Tabs
              value={typeTraining}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Funcional" {...a11yProps(0)} />
              <Tab label="Corrida" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </Box>
        <TabPanel value={typeTraining} index={0}>
          <CreateTraining
            expanded={newRegister}
            setExpanded={setNewRegister}
            exercises={exercises}
            metods={metods}
            trainings={trainings}
            handleGetTrainings={handleGetTrainings}
          />
          {editRegister && (
            <EditCategory
              exerciseEdit={exerciseEdit}
              expanded={editRegister}
              setExpanded={setEditRegister}
              setTitle={setTitle}
              setSeverity={setSeverity}
              setOpenSnack={setOpenSnack}
            />
          )}
          {trainings && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Data</StyledTableCell>
                    <StyledTableCell align="center">Método</StyledTableCell>
                    <StyledTableCell align="center">
                      Aquecimento
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Ativação Neural
                    </StyledTableCell>
                    <StyledTableCell align="center">Exercícios</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainings.Treinos.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row) => (
                    <StyledTableRow key={row.Nome}>
                      <StyledTableCell component="th" scope="row">
                        {row.Data}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.Metodo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <CustomWidthTooltip
                          disableFocusListener
                          title={row.Aquecimento.map((aqc) => (
                            <Box sx={{ display: "flex" }}>
                              <Typography>{aqc.exercicio}/</Typography>
                              <Typography>{aqc.reps}</Typography>
                            </Box>
                          ))}
                        >
                          <Typography>
                            {row.Aquecimento[0].exercicio}
                          </Typography>
                        </CustomWidthTooltip>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Tooltip disableFocusListener title={row.Ativacao}>
                          <Typography>{row.Ativacao}</Typography>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <CustomWidthTooltip
                          disableFocusListener
                          title={row.Exercicios.map((aqc) => (
                            <Box sx={{ display: "flex" }}>
                              <Typography>{aqc.exercicio}/</Typography>
                              <Typography>{aqc.reps}</Typography>
                            </Box>
                          ))}
                        >
                          <Typography>{row.Exercicios[0].exercicio}</Typography>
                        </CustomWidthTooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={trainings.Treinos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </TabPanel>
        <TabPanel value={typeTraining} index={1}>
          <Corrida />
        </TabPanel>
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

export default Training;
