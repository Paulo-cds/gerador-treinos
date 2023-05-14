import { useEffect, useState } from "react";
import {
  confirmTraining,
  fetchConfirm,
  fetchTrainings,
} from "../../Services/routes";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import BackdropImage from "../../Assets/Images/backdropToDay.jpg";
import "./styleToday.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Player from "../../Assets/Player";
import { useContext } from "react";
import { Context } from "../../Private";

const TrainingToDay = () => {
  const [trainings, setTrainings] = useState([]);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const toDay = `${day}/${month}/${year}`;
  const [todayTraining, setTodayTraining] = useState();
  const [openPlayer, setOpenPlayer] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");
  const [weekDay, setWeekDay] = useState(false);
  const { userData } = useContext(Context);
  const [controlConfirm, setControlConfirm] = useState();
  const [loading, setLoading] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  useEffect(() => {
    handleGetTrainings();

    const hoje = new Date();
    const diaSemana = hoje.getDay();
    if (diaSemana >= 1 && diaSemana <= 5) {
      setWeekDay(true);
    } else {
      setWeekDay(false);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      handleConfirmToDay();
    }
  }, [userData]);

  const handleGetTrainings = async () => {
    try {
      const newTrainings = [];
      const response = await fetchTrainings();
      response.docs.forEach((item) => {
        let newItem = item.data();
        newItem.id = item.id;
        newTrainings.push(newItem);
      });

      setTrainings(newTrainings[0]);
      filterTrainingToDay(newTrainings[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const filterTrainingToDay = (training) => {
    const filterToDay = training.Treinos.filter((item) => {
      return (
        new Date(item.Data).toLocaleString() == new Date(toDay).toLocaleString()
      );
    });

    if (filterToDay) {
      setTodayTraining(filterToDay[0]);
    }
  };

  const handleSetVideo = (link) => {
    setLinkVideo(link);
    setOpenPlayer(true);
  };

  const handleConfirm = async (verific) => {
    setLoading(true);
    try {
      const data = {
        uid: userData.id,
        nome: userData.nome,
        data: toDay,
        confirm: verific,
      };
      await confirmTraining(data);
      setLoading(false);
      handleConfirmToDay();
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleConfirmToDay = async () => {
    setLoading(true);
    try {
      const response = await fetchConfirm(userData.id);
      setControlConfirm(response.data());

      if (response.data().data === toDay) {
        setHasConfirmed(true);
      } else {
        setHasConfirmed(false);
      }
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
        // overflowY: "scroll",
        backgroundImage: todayTraining
          ? `url(${BackdropImage})`
          : weekDay
          ? `url(https://img.ahazou.com/tr:iodpr-2.0,oh-380,ow-380,oiar-1-1,w-380,oi-full-watermark-1x_SpmxT34_Q.png,oit-true/ahz-posts/a617814c-42b6-476d-a408-beeb5e3c8109/midia/post-19ccbc56-74ce-4d00-89a9-bef7dbc5aa6b.png)`
          : `url(https://outside360.com.br/wp-content/uploads/2020/05/Melhores-redes-de-descanso.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        p: 2,
      }}
      justifyContent={{ xs: "flex-start", sm: "flex-start", md: "center" }}
      alignItems={{ xs: "center", sm: "center", md: "flex-end" }}
    >
      {weekDay && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowY: "hidden",
            pb: 2,
          }}
          width={{ xs: "90%", sm: "90%", md: "60%" }}
          mt={{ xs: 3, sm: 3, md: 0 }}
        >
          {todayTraining ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "center",
                backgroundColor: "white",
                p: 3,
                gap: 2,
                border: "1px outset black",
                borderRadius: "10px",
                overflowY: "scroll",
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
              }}
            >
              {!hasConfirmed ? (
                <Box>
                  <Typography>Você vai treinar hoje?</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Box sx={{ flexDirection: "column", display: "flex" }}>
                      <Checkbox onClick={() => handleConfirm(true)} />
                      Sim
                    </Box>
                    <Box sx={{ flexDirection: "column", display: "flex" }}>
                      <Checkbox onClick={() => handleConfirm(false)} />
                      Não
                    </Box>
                  </Box>
                </Box>
              ) : controlConfirm.confirm ? (
                <img
                  style={{ width: "50px" }}
                  src="https://www.pngmart.com/files/15/Happy-Emoji-PNG.png"
                />
              ) : (
                <img
                  style={{ width: "50px" }}
                  src="https://cdn.pixabay.com/photo/2020/09/22/14/55/sad-emoji-5593352_1280.png"
                />
              )}
              <Box>
                <Typography variant="h4">Treino de Hoje</Typography>
                <Typography>{toDay}</Typography>
              </Box>
              <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                <Typography variant="h5">Método</Typography>
                <Divider />
                <Typography sx={{ mt: 2 }}>{todayTraining.Metodo}</Typography>
              </Box>
              <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                <Typography variant="h5">Aquecimento</Typography>
                <Typography variant="h6">
                  {todayTraining.RoundsAqc} Rounds
                </Typography>
                <Divider />
                <Box sx={{ mt: 2 }} minWidth={{ sm: 300, md: 650 }}>
                  <Player
                    open={openPlayer}
                    setOpen={setOpenPlayer}
                    link={linkVideo}
                  />
                  <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Exercício</TableCell>
                          <TableCell align="center">Repetições</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {todayTraining.Aquecimento.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              {row.exemplo && <HelpOutlineIcon />}
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
              {todayTraining.Ativacao && (
                <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                  <Typography variant="h5">Ativação Neural</Typography>
                  <Divider />
                  <Box sx={{ mt: 2 }}>
                    <Typography>{todayTraining.Ativacao}</Typography>
                  </Box>
                </Box>
              )}
              <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
                <Typography variant="h5">Treino</Typography>
                <Typography variant="h6">
                  {todayTraining.RoundsTraining} Rounds
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
                        {todayTraining.Exercicios.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
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
            </Box>
          ) : (
            <Box
            sx={{
              display: "flex",
              width:'70%',
              height:300,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "white",
              p: 3,
              gap: 2,
              border: "1px outset black",
              borderRadius: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
            >
              {!hasConfirmed ? (
                <Box>
                  <Typography>Você vai treinar hoje?</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Box sx={{ flexDirection: "column", display: "flex" }}>
                      <Checkbox onClick={() => handleConfirm(true)} />
                      Sim
                    </Box>
                    <Box sx={{ flexDirection: "column", display: "flex" }}>
                      <Checkbox onClick={() => handleConfirm(false)} />
                      Não
                    </Box>
                  </Box>
                </Box>
              ) : controlConfirm.confirm ? (
                <Box>
                <img
                  style={{ width: "150px" }}
                  src="https://www.pngmart.com/files/15/Happy-Emoji-PNG.png"
                />
                <Typography>Logo o treino será gerado!</Typography>
                </Box>
              ) : (
                <img
                  style={{ width: "150px" }}
                  src="https://cdn.pixabay.com/photo/2020/09/22/14/55/sad-emoji-5593352_1280.png"
                />
              )}
            </Box>
          )}
        </Box>
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

export default TrainingToDay;
