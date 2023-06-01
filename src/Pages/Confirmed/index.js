import {
  Backdrop,
  Box,
  CircularProgress,
  TablePagination,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import BackgroundImage from "../../Assets/Images/backgroundConfirm.jpg";
import { fetchAllConfirm } from "../../Services/routes";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { backdropHeaderTable } from "../../Assets/colors";

const Confirmed = () => {
  const [loading, setLoading] = useState(false);
  const [confirmeds, setConfirmeds] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const date = new Date();
  const verificToDay = date.getDate();
  const day = verificToDay < 10 ? "0" + verificToDay : verificToDay;
  const verificday = date.getMonth() + 1;
  const month = verificday < 10 ? "0" + verificday : verificday;
  const year = date.getFullYear();
  const toDay = `${day}/${month}/${year}`;

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
    handleGetConfirmed();
  }, []);

  const handleGetConfirmed = async () => {
    setLoading(true);
    try {
      const newConfirm = [];
      const response = await fetchAllConfirm();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        if (newItem.data === toDay) {
          newConfirm.push(newItem);
        }
      });
      setConfirmeds(newConfirm);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        backgroundImage: `url(${BackgroundImage})`,
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
        {confirmeds && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nome</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {confirmeds
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    (row) =>
                      !row.isAdmin && (
                        <StyledTableRow key={row.Nome}>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                            style={{
                              backgroundColor: row.confirm ? "green" : "red",
                            }}
                          >
                            {row.nome}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                  )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25]}
              component="div"
              count={confirmeds.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Box>
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

export default Confirmed;
