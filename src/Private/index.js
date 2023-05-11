import { createContext, useCallback, useState, useEffect } from "react";
import { db } from "../firebase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { Navigate } from "react-router-dom";

const Context = createContext();

function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user) => {
        //se tem user logado
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };

          localStorage.setItem("@detailUser", JSON.stringify(userData));

          setLoading(false);
          setSigned(true);
        } else {
          //não possui user logado
          setLoading(false);
          setSigned(false);
        }
      });
    }

    checkLogin();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = db.collection("users").doc(user.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            setIsAdmin(doc.data().isAdmin);
          }
        });
      } else {
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  if (signed && !isAdmin) {
    return <Navigate to="/trainingToDay" />;
  }
  return <Context.Provider value={{ isAdmin }}>{children}</Context.Provider>;
}

export { Context, Private };
