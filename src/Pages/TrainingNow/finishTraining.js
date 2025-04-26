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

const FinishTraining = ({ open, setOpen, id, run }) => {
  const [stravaLink, setStravaLink] = useState();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [title, setTitle] = useState("");
  const navigate = useNavigate()

  const effortLevels = [
    {
      level: 1,
      label: "0 a 2",
      icon: <MoodBadTwoToneIcon fontSize="100px" />,
    },
    {
      level: 2,
      label: "3 a 4",
      icon: <SentimentDissatisfiedTwoToneIcon fontSize="100px" />,
    },
    {
      level: 3,
      label: "5 a 6",
      icon: <SentimentSatisfiedAltTwoToneIcon fontSize="100px" />,
    },
    { level: 4, label: "7 a 8", icon: <MoodTwoToneIcon fontSize="100px" /> },
    {
      level: 5,
      label: "9 a 10",
      icon: <SentimentVeryDissatisfiedTwoToneIcon fontSize="100px" />,
    },
  ];

  const handleFinishTraining = async () => {
    if(!selectedLevel){
        alert("Selecione o nível de esforço!")
        return
    }
    setLoading(true);
    try {
      const data = {
        StravaLink: stravaLink,
        Esforco: selectedLevel,
        Finalizado:true
      };
      await editTrainingData(data, id);
      setSeverity("success");
      setTitle("Treino finalizado com sucesso!");
      setOpenAlert(true);
      setTimeout(()=>{
        navigate('/myTrainings')
      },1500)
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
            {effortLevels.map(({ level, label, icon }) => (
              <Tooltip title={label} key={level}>
                <Box
                  onClick={() => setSelectedLevel(label)}
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    color: selectedLevel === label ? "blue" : "black",
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
          <Button variant="contained" onClick={()=>handleFinishTraining()} >Finalizar</Button>
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
