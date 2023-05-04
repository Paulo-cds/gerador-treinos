import { Box, TextField, styled } from "@mui/material";
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

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [newRegister, setNewRegister] = useState(false);

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
    const handleGetExercises = async () => {
      try {
        const newExercises = [];
        const response = await fetchExercises();
        response.docs.forEach((item) => {
          let newItem = item.data();
          newItem.id = item.id;
          newExercises.push(newItem);
          // setExercises((prevState) => [
          //   ...prevState,
          //   [item.data(), { id: item.id }],
          // ]);
        });
        setExercises(newExercises);
      } catch (e) {
        console.log(e);
      }
    };

    handleGetExercises();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <CreateExercise expanded={newRegister} setExpanded={setNewRegister} />
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
                <StyledTableCell align="center">{row.exemplo}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Exercises;
