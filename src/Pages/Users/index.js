import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import CreateUser from "./createUser";
import BackgroundImage from "../../Assets/Images/backgroundUsers.jpg";

const Users = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      categoria: "",
      exemplo: "",
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      categoria: yup.string().required("O campo é obrigatório."),
      exemplo: yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
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
        ml={{ xs: 0, sm: 0, md: 4 }}
        mt={{ xs: 3, sm: 3, md: 0 }}
      >
        <CreateUser />
      </Box>
    </Box>
  );
};

export default Users;
