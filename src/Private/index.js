import { createContext, useCallback, useState, useEffect } from "react";
import { db } from "../firebase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { Navigate, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

const Context = createContext();

function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    await onAuthStateChanged(auth, (user) => {
      //se tem user logado      
      if (user) {
        const userValues = {
          uid: user.uid,
          email: user.email,
        };

        localStorage.setItem("@detailUser", JSON.stringify(userValues));

        const userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            let data = doc.data();
            data.id = user.uid;
            setUserData(data);
            setIsAdmin(doc.data().isAdmin);
            // if (!doc.data().isAdmin) {
            //   navigate("/trainingToDay");
            // }
          }
        });

        setLoading(false);
        setSigned(true);
      } else {
        //não possui user logado
        setIsAdmin(false);
        setLoading(false);
        setSigned(false);
        navigate("/login");
      }
    });
  };

  return loading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    userData && (
      <Context.Provider value={{ isAdmin, userData }}>
        {children}
      </Context.Provider>
    )
  );
}

export { Context, Private };
