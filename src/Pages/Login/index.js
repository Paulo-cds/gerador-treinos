import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackdropImage from "../../Assets/Images/backdropLogin.jpeg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import "./styleLogin.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setLoading(false);
  };

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true)
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
          // navegar para /admin
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log("Erro ao logar: " + error);

          if (error.code === "auth/user-not-found") {
            alert("Usuário não cadastrado!");
          } else if (error.code === "auth/wrong-password") {
            alert("Senha incorreta!");
          }
        });
        setLoading(false)
    } else {
      setLoading(false)
      alert("Preencha todos os campos!");
    }
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${BackdropImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        className="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          backgroundColor: "white",
          p: 4,
          borderRadius: "20px",
          boxShadow:
            "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        }}
      >
        <Typography variant="h4">Bem vindo!</Typography>
        <TextField
          type="text"
          label="Email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          type="password"
          label="Senha"
          value={password}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" type="submit">
          Acessar
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
