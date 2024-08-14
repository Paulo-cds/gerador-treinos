import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import sino from "../Audios/sino.mp3";
import roundAudio from "../Audios/Boxing gong.mp3";
import Timer from "../Images/timer.png";

const TabataTimer = () => {
  const [interval, setInterval] = useState("Pronto");
  const [timeStamp, setTimeStamp] = useState();
  const [round, setRound] = useState(1);
  const [finalTimer, setFinalTimer] = useState(false);
  const [timeoutTimer, setTimeoutTimer] = useState();
  const [continueTimer, setContinueTimer] = useState(false);
  const [running, setRunning] = useState(false);
  const [pause, setPause] = useState(false);
  const audio = new Audio(sino);
  const intervalo = new Audio(roundAudio);

  useEffect(() => {
    if (timeStamp) {
      if (timeStamp === 1 && round !== 8) {
        if (interval === "Exercício") {
          intervalo.play();
        } else {
          intervalo.play();
        }
      }
      if (timeStamp < 1) {
        if (round === 8) {
          clearTimeout(timeoutTimer);
          setFinalTimer(true);
          audio.play();
          return;
        }
        if (interval === "Exercício") {
          // intervalo.play();
          setTimeStamp(10);
          setInterval("Descanso");
        } else {
          // intervalo.play();
          setTimeStamp(20);
          setInterval("Exercício");
          setRound(round + 1);
        }
        return;
      }
    }

    setTimeoutTimer(
      setTimeout(() => {
        setTimeStamp(timeStamp - 1);
      }, 1000)
    );
    return () => clearTimeout(timeoutTimer);
  }, [timeStamp, continueTimer]);

  return window.screen.width >= 600 ? (
    <Box
      sx={{
        backgroundImage: `url(${Timer})`,
        backgroundSize: "cover",
        width: "250px",
        height: "300px",
        position: "fixed",
        left: 10,
        top: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <Box
        backgroundColor={
          (interval === "Exercício" && timeStamp > 0) ||
          (interval === "Descanso" && timeStamp < 1)
            ? "green"
            : (interval === "Descanso" && timeStamp > 0) ||
              (interval === "Exercício" && timeStamp < 1)
            ? "red"
            : "white"
        }
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 2,
          borderRadius: "50%",
          width: "215px",
          height: "220px",
          mt: "48px",
        }}
      >
        <Typography variant="h5">{interval}</Typography>
        <Typography variant="h5">
          {timeStamp && timeStamp >= 0 ? timeStamp : ""}
        </Typography>
        <Typography variant="h5">Round {round}</Typography>
        {!finalTimer ? (
          <>
            <Box>
              {!running ? (
                <Button
                  onClick={() => {
                    setTimeStamp(20);
                    setRunning(true);
                    setInterval("Exercício");
                    intervalo.play();
                  }}
                >
                  <PlayCircleFilledWhiteIcon sx={{ color: "black" }} />
                </Button>
              ) : (
                <>
                  {!pause ? (
                    <Button
                      onClick={() => {
                        clearTimeout(timeoutTimer);
                        setPause(true);
                      }}
                    >
                      <StopCircleIcon sx={{ color: "black" }} />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setContinueTimer(!continueTimer);
                        setPause(false);
                      }}
                    >
                      <NotStartedIcon sx={{ color: "black" }} />
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      clearTimeout(timeoutTimer);
                      setInterval("Exercício");
                      setPause(false);
                      setTimeStamp(20);
                      setRound(1);
                      intervalo.play();
                    }}
                  >
                    <RestartAltIcon sx={{ color: "black" }} />
                  </Button>
                </>
              )}
            </Box>
          </>
        ) : (
          <Box>
            <Typography>Série finalizada</Typography>
            <Button
              onClick={() => {
                setFinalTimer(false);
                clearTimeout(timeoutTimer);
                setTimeStamp(20);
                setRound(1);
              }}
            >
              <RestartAltIcon sx={{ color: "black" }} />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100px",
      }}
      backgroundColor={
        interval === "Exercício"
          ? "green"
          : interval === "Descanso"
          ? "red"
          : "white"
      }
    >
      {/* <Typography variant="h5">{interval}</Typography> */}
      <Typography variant="h5">
        {timeStamp && timeStamp >= 0 ? timeStamp : ""}
      </Typography>
      <Typography variant="h5">Round {round}</Typography>
      {!finalTimer ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {!running ? (
              <Button
                onClick={() => {
                  setTimeStamp(20);
                  setRunning(true);
                  setInterval("Exercício");
                  intervalo.play();
                }}
              >
                <PlayCircleFilledWhiteIcon sx={{ color: "black" }} />
              </Button>
            ) : (
              <>
                {!pause ? (
                  <Button
                    onClick={() => {
                      clearTimeout(timeoutTimer);
                      setPause(true);
                    }}
                  >
                    <StopCircleIcon sx={{ color: "black" }} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setContinueTimer(!continueTimer);
                      setPause(false);
                    }}
                  >
                    <NotStartedIcon sx={{ color: "black" }} />
                  </Button>
                )}
                <Button
                  onClick={() => {
                    clearTimeout(timeoutTimer);
                    setInterval("Exercício");
                    setPause(false);
                    setTimeStamp(20);
                    setRound(1);
                    intervalo.play();
                  }}
                >
                  <RestartAltIcon sx={{ color: "black" }} />
                </Button>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box>
          <Typography>Série finalizada</Typography>
          <Button
            onClick={() => {
              setFinalTimer(false);
              clearTimeout(timeoutTimer);
              setTimeStamp(20);
              setRound(1);
            }}
          >
            <RestartAltIcon sx={{ color: "black" }} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TabataTimer;
