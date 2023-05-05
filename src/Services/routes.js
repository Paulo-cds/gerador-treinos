import { db } from "../firebase.js";
import {
  addDoc,
  doc,
  query,
  getDocs,
  collection,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";

/******Função que faz o Get dos exercicios******/
export const fetchExercises = async () => {
  const data = db.collection("Exercicios");
  const response = await data.get();
  return response;
};

/******Função que faz o Get das categorias******/
export const fetchCategories = async () => {
  const data = db.collection("Categorias");
  const response = await data.get();
  return response;
};

/******Função que adiciona exercicio******/
export const addExercise = async (form) => {
  const response = await db
    .collection("Exercicios")
    .add(form)
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};
