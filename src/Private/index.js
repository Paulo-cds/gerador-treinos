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
  const auth = getAuth();
  const navigate = useNavigate()

  useEffect(() => {
    async function checkLogin() {
      const unsub = await onAuthStateChanged(auth, (user) => {
        //se tem user logado
        if (user) {
          console.log('tem user ', user)
          const userData = {
            uid: user.uid,
            email: user.email,
          };

          localStorage.setItem("@detailUser", JSON.stringify(userData));

          const userRef = db.collection("users").doc(user.uid);
          userRef.get().then((doc) => {
            if (doc.exists) {
              setIsAdmin(doc.data().isAdmin);
              if (!doc.data().isAdmin) {
                navigate("/trainingToDay")
              }
            }
          });

          setLoading(false);
          setSigned(true);
        } else {
          //não possui user logado
          setIsAdmin(false);
          setLoading(false);
          setSigned(false);
          navigate("/login")
        }
      });
    }

    checkLogin();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       const userRef = db.collection("users").doc(user.uid);
  //       userRef.get().then((doc) => {
  //         if (doc.exists) {
  //           setIsAdmin(doc.data().isAdmin);
  //         }
  //       });
  //     } else {
  //       setIsAdmin(false);
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  if (loading) {
    return (
    <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
    // onClick={handleClose}
  >
    <CircularProgress color="inherit" />
  </Backdrop>)
  }

  // if (!signed) {
  //   return <Navigate to="/login" />;
  // }

  // if (signed && !isAdmin) {
  //   return <Navigate to="/trainingToDay" />;
  // }
  return <Context.Provider value={{ isAdmin }}>{children}</Context.Provider>;
}

export { Context, Private };