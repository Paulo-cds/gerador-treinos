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

/******Função que faz o Get dos metodos******/
export const fetchMetods = async () => {
  const data = db.collection("Metodos");
  const response = await data.get();
  return response;
};

/******Função que faz o Get dos treinos******/
export const fetchTrainings = async () => {
  const data = db.collection("Treinos");
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

/******Função que adiciona categoria******/
export const addCategory = async (form) => {
  const response = await db
    .collection("Categorias")
    .add(form)
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função que adiciona método******/
export const addMetod = async (form) => {
  const response = await db
    .collection("Metodos")
    .add(form)
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função que adiciona treino******/
// export const addTraining = async (form) => {
//   const response = await db
//     .collection("Treinos")
//     .add(form)
//     .then((doc) => {
//       return { data: doc, status: 200 };
//     })
//     .catch((err) => {
//       return { status: 400 };
//     });

//   return response;
// };

/******Função que adiciona treino******/
export const addTraining = async (data, id) => {
  const response = await db
    .collection("Treinos")
    .doc(id)
    .update(data)
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que faz o delete do exercicio******/
export const deleteRenter = async (id) => {
  const response = await db
    .collection("Exercicios")
    .doc(id)
    .delete()
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que faz o delete do categoria******/
export const deleteCategory = async (id) => {
  const response = await db
    .collection("Categorias")
    .doc(id)
    .delete()
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que faz o delete do método******/
export const deleteMetod = async (id) => {
  const response = await db
    .collection("Metodos")
    .doc(id)
    .delete()
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que edita exercicio******/
export const changeExercise = async (data, id) => {
  const response = await db
    .collection("Exercicios")
    .doc(id)
    .update(data)
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que edita categoria******/
export const changeCategory = async (data, id) => {
  const response = await db
    .collection("Categorias")
    .doc(id)
    .update(data)
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que edita metodo******/
export const changeMetod = async (data, id) => {
  const response = await db
    .collection("Metodos")
    .doc(id)
    .update(data)
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};
