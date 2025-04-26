import { Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"


const CardViewTraining = ({training}) => {
    const navigate = useNavigate()
    return(
        <Paper elevation={3}
            sx={{
                backgroundColor:'primary.main',
                width: '90%',
                p:2,
                textAlign:'center',
                cursor:'pointer',
                transition:'all 0.5s ease-in',
                ':hover':{
                    opacity:'0.7',
                    backgroundColor:'primary.dark',
                    color:'white',
                    borderRadius:'20px'
                }
            }}
            onClick={()=>navigate(`/trainingNow/${training.id}`)}
         >
            <Typography>
                Tipo: {training.Tipo}
            </Typography>
            <Typography>
                Treino: {training.Titulo}
            </Typography>
            
        </Paper>
    )
}

export default CardViewTraining