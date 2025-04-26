import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import BackdropImage from "../../Assets/Images/backdropToDay.jpg";
import {
  fetchGetSingleTraining,
} from "../../Services/routes";
import LoadingDefault from "../../Assets/Components/loadingDefault";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Player from "../../Assets/Player";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FinishTraining from "./finishTraining";

const TrainingNow = () => {
  const { id } = useParams();
  const [openFinish, setOpenFinish] = useState(false);
  const [trainingView, setTrainingView] = useState();
  const [loading, setLoading] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");

  const handleSetVideo = (link) => {
    const isInstagramUrl = (link) => {
      try {
        const url = new URL(link);
        const pathname = url.pathname;
        return /^\/(p|reel|tv)\/[a-zA-Z0-9_-]+\/?$/.test(pathname);
      } catch (e) {
        return false;
      }
    };
    if (isInstagramUrl(link)) {
      window.open(link, "_blank");
    } else {
      setLinkVideo(link);
      setOpenPlayer(true);
    }
  };

  useEffect(() => {
    handleGetMyTrainings();
  }, []);

  const handleGetMyTrainings = async () => {
    setLoading(true);
    try {
      const response = await fetchGetSingleTraining(id);
      setTrainingView(response);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${BackdropImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        p: 2,
        alignItems: { xs: "center", md: "flex-end" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "400px",
          backgroundColor: "white",
          p: 2,
          borderRadius: "20px",
          maxHeight: "90%",
          gap: 2,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        width={{ xs: "100%", sm: "100%", md: "60%" }}
        mt={{ xs: 3, sm: 3, md: 3 }}
      >
        {trainingView ? (
          <Box sx={{ width: "100%" }}>
            {trainingView.Tipo === "corrida" ? (
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                }}
              >
                {trainingView.Titulo && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      borderBottom: "1px solid black",
                    }}
                  >
                    <Typography variant="h6">{trainingView.Titulo}</Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderBottom: "1px solid black",
                  }}
                >
                  <Typography variant="h6">Aquecimento</Typography>
                  <Divider />
                  <Typography variant="subtitle1">
                    {trainingView.Aquecimento}
                  </Typography>
                  {trainingView.Exemplo && (
                    <Typography
                      variant="subtitle2"
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                      onClick={() => handleSetVideo(trainingView.Exemplo)}
                    >
                      Exemplo: <OndemandVideoIcon />
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderBottom: "1px solid black",
                  }}
                >
                  <Typography variant="h6">Treino</Typography>
                  <Divider />
                  <Typography variant="subtitle1">
                    {trainingView.Treino}
                  </Typography>
                </Box>
                {trainingView.Observacao && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography variant="h6">Observacao</Typography>
                    <Divider />
                    <Typography variant="subtitle1">
                      {trainingView.Observacao}
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <>
                {trainingView.Metodo && (
                  <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                    <Typography variant="h5">Método</Typography>
                    <Divider />
                    <Typography sx={{ mt: 2 }}>
                      {trainingView.Metodo}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ pt: 2 }}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Aquecimento
                  </Typography>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {trainingView.RoundsAqc} Rounds
                  </Typography>
                  <Divider />
                  <Box sx={{ mt: 2 }} minWidth={{ sm: 300, md: 650 }}>
                    <TableContainer component={Paper}>
                      <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Exercício</TableCell>
                            <TableCell align="center">Repetições</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {trainingView.Aquecimento.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                {row.exemplo && (
                                  <HelpOutlineIcon
                                    sx={{ cursor: "pointer", mr: 2 }}
                                    onClick={() => handleSetVideo(row.exemplo)}
                                  />
                                )}
                                {row.exercicio}
                              </TableCell>
                              <TableCell align="center">{row.reps}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
                {trainingView.Ativacao && (
                  <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      Ativação Neural
                    </Typography>
                    <Divider />
                    <Box sx={{ textAlign: "center"}}>
                      <Typography>{trainingView.Ativacao}</Typography>
                    </Box>
                  </Box>
                )}
                <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Treino
                  </Typography>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {trainingView.RoundsTraining} Rounds
                  </Typography>
                  <Divider />
                  <Box sx={{ mt: 2 }} minWidth={{ sm: 300, md: 650 }}>
                    <TableContainer component={Paper}>
                      <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Exercício</TableCell>
                            <TableCell align="center">Repetições</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {trainingView.Exercicios.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">
                                {row.exemplo && (
                                  <HelpOutlineIcon
                                    sx={{ cursor: "pointer", mr: 2 }}
                                    onClick={() => handleSetVideo(row.exemplo)}
                                  />
                                )}
                                {row.exercicio}
                              </TableCell>
                              <TableCell align="center">{row.reps}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
                {trainingView.Observacao && (
                  <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                    <Typography variant="h5">Observação</Typography>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                      <Typography>{trainingView.Observacao}</Typography>
                    </Box>
                  </Box>
                )}
              </>
            )}
            {trainingView.Finalizavel && (
              <Button
                variant="contained"
                sx={{
                  mr: "auto",
                  ml: "auto",
                  mt: 3,
                }}
                onClick={() => setOpenFinish(true)}
              >
                Finalizar treino
              </Button>
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Player open={openPlayer} setOpen={setOpenPlayer} link={linkVideo} />
      <LoadingDefault open={loading} />
      {openFinish && (
        <FinishTraining
          open={openFinish}
          setOpen={setOpenFinish}
          id={id}
          run={trainingView.Tipo === "corrida" ? true : false}
        />
      )}
    </Box>
  );
};

export default TrainingNow;
