import { useEffect, useState } from "react";
import { fetchTrainings } from "../../Services/routes";
import { Box, Divider, Typography } from "@mui/material";
import BackdropImage from "../../Assets/Images/backdropToDay.jpg";
import './styleToday.css'

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
      console.log(filterToDay)
      setTodayTraining(filterToDay[0]);
    }
  };
  // console.log(trainings)

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        backgroundImage: `url(${BackdropImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p:2
      }}
      
      alignItems={{ xs: "center", sm: "center", md: "flex-end" }}
    >
      <Box
      className='container'
        sx={{
          height: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop:2
        }}
        width={{ xs: "90%", sm: "90%", md: "60%" }}
        mr={{ xs: 0, sm: 0, md: 4 }}
        mt={{ xs: 3, sm: 3, md: 0 }}
      >
        {todayTraining && (
          <Box
            sx={{
              display: "flex",
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
              <Divider />
              <Box sx={{ mt: 2 }}>
                {todayTraining.Aquecimento.map((aqc) => (
                  <Typography>{aqc}</Typography>
                ))}
              </Box>
            </Box>
            <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
              <Typography variant="h5">Ativação Neural</Typography>
              <Divider />
              <Box sx={{ mt: 2 }}>
                  <Typography>{todayTraining.Ativacao}</Typography>
              </Box>
            </Box>
            <Box sx={{ borderTop: "1px solid black", pt: 2 }}>
              <Typography variant="h5">Exercícios</Typography>
              <Divider />
              <Box sx={{ mt: 2 }}>
                {todayTraining.Exercicios.map((aqc) => (
                  <Typography>{aqc}</Typography>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TrainingToDay;
