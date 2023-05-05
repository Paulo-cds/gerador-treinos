import {
  Backdrop,
  Box,
  CircularProgress,
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
import { fetchExercises } from "../../Services/routes";
import CreateExercise from "./createExercise";
import Player from "../../Assets/Player";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [newRegister, setNewRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");

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
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setLoading(false);
  };

  const handleSetVideo = (link) => {
    setLinkVideo(link);
    setOpenPlayer(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CreateExercise
        handleGetExercises={handleGetExercises}
        expanded={newRegister}
        setExpanded={setNewRegister}
      />
      <Player open={openPlayer} setOpen={setOpenPlayer} link={linkVideo} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Exercício</StyledTableCell>
              <StyledTableCell align="center">Categoria</StyledTableCell>
              <StyledTableCell align="center">Exemplo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.nome}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.categoria}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => handleSetVideo(row.exemplo)}
                  align="center"
                >
                  {row.exemplo}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
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

export default Exercises;
