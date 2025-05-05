import {
  Backdrop,
  Box,
  Button,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MoodBadTwoToneIcon from "@mui/icons-material/MoodBadTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import SentimentSatisfiedAltTwoToneIcon from "@mui/icons-material/SentimentSatisfiedAltTwoTone";
import MoodTwoToneIcon from "@mui/icons-material/MoodTwoTone";
import SentimentVeryDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentVeryDissatisfiedTwoTone";
import LoadingDefault from "../../Assets/Components/loadingDefault";
import { editTrainingData } from "../../Services/routes";
import AlertFeedBack from "../../Assets/Components/alertFeedBack";
import { useNavigate } from "react-router-dom";
import LeveIcon from "../../images/leve.png";
import MuitoLeve from "../../images/muito leve.png";
import Medio from "../../images/medio.png";
import Dificil from "../../images/dificil.png";
import MuitoDificil from "../../images/muito dificil.png";

const FinishTraining = ({ open, setOpen, id, run }) => {
  const [stravaLink, setStravaLink] = useState();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const effortLevels = [
    {
      level: 1,
      label: "0 a 2",
      effort: "Muito leve",
      icon: <img src={MuitoLeve} alt="Leve" width="40px" />,
    },
    {
      level: 2,
      label: "3 a 4",
      effort: "Leve",
      icon: <img src={LeveIcon} alt="Leve" width="40px" />,
    },
    {
      level: 3,
      label: "5 a 6",
      effort: "Médio",
      icon: <img src={Medio} alt="Leve" width="40px" />,
    },
    {
      level: 4,
      label: "7 a 8",
      effort: "Dificil",
      icon: <img src={Dificil} alt="Leve" width="40px" />,
    },
    {
      level: 5,
      label: "9 a 10",
      effort: "Muito dificil",
      icon: <img src={MuitoDificil} alt="Leve" width="40px" />,
    },
  ];

  const handleFinishTraining = async () => {
    if (!selectedLevel) {
      alert("Selecione o nível de esforço!");
      return;
    }
    setLoading(true);
    try {
      let link = "";
      if (stravaLink) {
        const match = stravaLink.match(/https?:\/\/[^\s]+/);
        link = match ? match[0] : "";
      }
      const data = {
        StravaLink: link,
        Esforco: selectedLevel,
        Finalizado: true,
      };
      await editTrainingData(data, id);
      setSeverity("success");
      setTitle("Treino finalizado com sucesso!");
      setOpenAlert(true);
      setTimeout(() => {
        navigate("/myTrainings");
      }, 1500);
    } catch (e) {
      console.log(e);
      setSeverity("error");
      setTitle("Erro ao finalizar treino, tente novamente.");
      setOpenAlert(true);
    }
    setLoading(false);
  };

  return (
    <Backdrop sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper
        sx={{
          width: "350px",
          maxWidth: "90%",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderRadius: "20px",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Selecione o nível de esforço
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem" }}>
            {effortLevels.map(({ level, label, effort, icon }) => (
              <Tooltip title={effort} key={level}>
                <Box
                  onClick={() => setSelectedLevel(label)}
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    p:'2px',
                    boxShadow: selectedLevel === label ? "0px 0px 10px yellow" : "none",
                    borderRadius: selectedLevel === label ? "15px 15px" : "none",
                    backgroundColor: selectedLevel === label ? "yellow" : "none",
                  }}
                >
                  <Box sx={{ fontSize: "2rem" }}>{icon}</Box>
                  <Box>{label}</Box>
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>
        {run && (
          <TextField
            name="stravaLink"
            value={stravaLink}
            label="Link do Strava"
            onChange={(e) => setStravaLink(e.target.value)}
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => handleFinishTraining()}>
            Finalizar
          </Button>
        </Box>
      </Paper>
      <LoadingDefault open={loading} />
      <AlertFeedBack
        open={openAlert}
        setOpen={setOpenAlert}
        title={title}
        severity={severity}
      />
    </Backdrop>
  );
};

export default FinishTraining;
