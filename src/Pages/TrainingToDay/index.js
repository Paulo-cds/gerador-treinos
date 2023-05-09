import { useEffect, useState } from "react";
import { fetchTrainings } from "../../Services/routes";
import { Box, Typography } from "@mui/material";

const TrainingToDay = () => {
  const [trainings, setTrainings] = useState([]);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const toDay = `${day}/${month}/${year}`;
  const [todayTraining, setTodayTraining] = useState();

  useEffect(() => {
    handleGetTrainings();
  }, []);

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

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        // backgroundImage: `url(${BackdropImage})`,
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
        {todayTraining && (
          <Box>
            <Typography>Método {todayTraining.Metodo}</Typography>
            <Typography>Aquecimento</Typography>
            {todayTraining.Aquecimento.map((aqc) => (
              <Typography>{aqc}</Typography>
            ))}
            <Typography>Exercícios</Typography>
            {todayTraining.Exercicios.map((aqc) => (
              <Typography>{aqc}</Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TrainingToDay;
