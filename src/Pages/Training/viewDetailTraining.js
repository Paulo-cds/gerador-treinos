import { useEffect, useState } from "react";
import { fetchOneTraining } from "../../Services/routes";
import { Backdrop, Box, Button, Divider, Typography } from "@mui/material";
import LoadingDefault from "../../Assets/Components/loadingDefault";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Player from "../../Assets/Player";
import LinkIcon from "@mui/icons-material/Link";

const ViewDetailTraining = ({ trainingId, open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [trainingView, setTrainingView] = useState();
  const [openPlayer, setOpenPlayer] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");

  useEffect(() => {
    handleGetTraining();
  }, []);

  const handleGetTraining = async () => {
    setLoading(true);
    try {
      const response = await fetchOneTraining(trainingId);
      setTrainingView(response);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

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

  return (
    trainingView && (
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "white",
            width: "500px",
            maxWidth: "90%",
            p: 2,
            borderRadius: "20px",
            maxHeight: "95%",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {trainingView.Tipo === "corrida" ? (
            <>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6">Título</Typography>
                <Divider />
                <Typography variant="subtitle1">
                  {trainingView.Titulo}
                </Typography>
              </Box>
              {(trainingView.Aquecimento || trainingView.Exemplo) && (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "20px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {trainingView.Aquecimento && (
                    <>
                      <Typography variant="h6">Aquecimento</Typography>
                      <Divider />
                      <Typography variant="subtitle1">
                        {trainingView.Aquecimento}
                      </Typography>
                    </>
                  )}
                  {trainingView.Exemplo && (
                    <>
                      {trainingView.Aquecimento && <Divider />}
                      <Typography
                        variant="h6"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        Exemplo aquecimento:{" "}
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
                          <OndemandVideoIcon />
                        </Typography>
                      </Typography>
                    </>
                  )}
                </Box>
              )}
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6">Treino</Typography>
                <Divider />
                <Typography variant="subtitle1">
                  {trainingView.Treino}
                </Typography>
              </Box>
              {(trainingView.FinalizacaoTreino ||
                trainingView.ExemploFinal) && (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "20px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {trainingView.FinalizacaoTreino && (
                    <>
                      <Typography variant="h6">
                        Finalização do treino
                      </Typography>
                      <Divider />
                      <Typography variant="subtitle1">
                        {trainingView.FinalizacaoTreino}
                      </Typography>
                    </>
                  )}
                  {trainingView.ExemploFinal && (
                    <>
                      <Divider />
                      <Typography
                        variant="h6"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        Exemplo finalização:{" "}
                        <Typography
                          variant="subtitle2"
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                          onClick={() =>
                            handleSetVideo(trainingView.ExemploFinal)
                          }
                        >
                          <OndemandVideoIcon />
                        </Typography>
                      </Typography>
                    </>
                  )}
                </Box>
              )}
              {trainingView.Observacao && (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "20px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">Observação</Typography>
                  <Divider />
                  <Typography variant="subtitle1">
                    {trainingView.Observacao}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="subtitle1">
                  Finalizado: {trainingView.Finalizado ? "Sim" : "Não"}
                </Typography>
                {trainingView.Finalizado && (
                  <>
                    <Divider />
                    <Typography variant="subtitle1">
                      Nível de esforço: {trainingView.Esforco}
                    </Typography>
                  </>
                )}
                {trainingView.StravaLink && (
                  <>
                    <Divider />
                    <Typography
                      variant="subtitle1"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      Link Strava:{" "}
                      <LinkIcon
                        sx={{
                          cursor: "pointer",
                          fontSize: "2.5em",
                        }}
                        onClick={() =>
                          window.open(trainingView.StravaLink, "_blank")
                        }
                      />
                    </Typography>
                  </>
                )}
              </Box>

              <Button onClick={() => setOpen(false)} variant="contained">
                Voltar
              </Button>
            </>
          ) : (
            <>
              {trainingView.Titulo && (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "20px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">Título</Typography>
                  <Divider />
                  <Typography variant="subtitle1">
                    {trainingView.Titulo}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6">
                  Aquecimento - {trainingView.RoundsAqc} Rounds
                </Typography>
                <Divider />
                {trainingView.Aquecimento.map((exe) => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="subtitle1">
                        {exe.exercicio} - {exe.reps} repetições
                      </Typography>
                    </Box>
                    <Divider />
                  </>
                ))}
              </Box>
              {trainingView.Ativacao && (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "20px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">Ativacao Neural</Typography>
                  <Divider />
                  <Typography variant="subtitle1">
                    {trainingView.Ativacao}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6">
                  Treino - {trainingView.RoundsTraining} Rounds
                </Typography>
                <Divider />
                {trainingView.Exercicios.map((exe) => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="subtitle1">
                        {exe.exercicio} - {exe.reps} repetições
                      </Typography>
                    </Box>
                    <Divider />
                  </>
                ))}
              </Box>
              {trainingView.Observacao && (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "20px",
                    p: 2,
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
              <Button onClick={() => setOpen(false)} variant="contained">
                Voltar
              </Button>
            </>
          )}
        </Box>
        <LoadingDefault open={loading} />
        <Player open={openPlayer} setOpen={setOpenPlayer} link={linkVideo} />
      </Backdrop>
    )
  );
};

export default ViewDetailTraining;
