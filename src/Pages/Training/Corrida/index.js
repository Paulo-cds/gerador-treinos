import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import CreateRunning from "./createTraining";
import { useEffect, useState } from "react";
import { fetchRunningTrainings } from "../../../Services/routes";
import { backdropHeaderTable } from "../../../Assets/colors";

const Corrida = () => {
  const [expanded, setExpanded] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    handleGetTrainings();
  }, []);

  const handleGetTrainings = async () => {
    setLoading(true);
    try {
      let newTrainings = [];
      const response = await fetchRunningTrainings();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newTrainings.push(newItem);
      });
      let control = newTrainings;

      // control = control.reverse();
      setTrainings(control);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <Box>
      <CreateRunning
        expanded={expanded}
        setExpanded={setExpanded}
        handleGetTrainings={handleGetTrainings}
      />
      {trainings && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Data</StyledTableCell>
                <StyledTableCell align="center">Treino</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.Nome}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Data}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.Treino}
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

export default Corrida;
