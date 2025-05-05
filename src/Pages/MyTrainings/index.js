import { useContext, useEffect, useState } from "react";
import { Context } from "../../Private";
import { Box, Button, ButtonGroup } from "@mui/material";
import BackdropImage from "../../Assets/Images/backdropToDay.jpg";
import { fetchTrainingsNotFinished } from "../../Services/routes";
import LoadingDefault from "../../Assets/Components/loadingDefault";
import CardViewTraining from "./cardViewTraining";
import { useNavigate } from "react-router-dom";

const MyTrainings = () => {
  const { userData } = useContext(Context);
  const [myUnfinishedTrainings, setMyUnfinishedTrainings] = useState();
  const [loading, setLoading] = useState(false);
  const [viewTrainingType, setViewTrainingType] = useState("funcional");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetMyTrainings();
  }, []);

  const handleGetMyTrainings = async () => {
    setLoading(true);
    try {
      const response = await fetchTrainingsNotFinished(
        userData.tipo === "personal" ? userData.id : "turma"
      );
      let control = response;
      control.forEach((item) => {
        if (typeof item.Data === "object") {
          item.Data = new Date(item.Data.seconds * 1000);
        } else {
          item.Data = new Date(item.Data.split("/").reverse().join("/"));
        }
      });
      control = control.sort((a, b) => {
        return new Date(a.Data) - new Date(b.Data);
      });
      setMyUnfinishedTrainings(control);
      if (userData.tipo !== "personal") {
        navigate(`/trainingNow/${control[control.length - 1].id}`);
      }
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
          maxHeight: "95%",
          gap: 2,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        width={{ xs: "100%", sm: "100%", md: "60%" }}
        mt={{ xs: 3, sm: 3, md: 3 }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
          }}
        >
          <Button
            onClick={() => setViewTrainingType("funcional")}
            variant={
              viewTrainingType === "funcional" ? "contained" : "outlined"
            }
          >
            Funcional
          </Button>
          <Button
            onClick={() => setViewTrainingType("corrida")}
            variant={viewTrainingType === "corrida" ? "contained" : "outlined"}
          >
            Corrida
          </Button>
        </ButtonGroup>
        {myUnfinishedTrainings &&
          myUnfinishedTrainings.map(
            (training, i) =>
              training.Tipo === viewTrainingType && (
                <CardViewTraining training={training} key={i} />
              )
          )}
      </Box>
      <LoadingDefault open={loading} />
    </Box>
  );
};

export default MyTrainings;
