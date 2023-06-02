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

/******Função que faz o Get dos treinos de corrida******/
export const fetchRunningTrainings = async () => {
  const data = db.collection("Corrida");
  const response = await data.get();
  return response;
};

/******Função que faz o Get dos usuarios******/
export const fetchUsers = async () => {
  const data = db.collection("users");
  const response = await data.get();
  return response;
};

/******Função que faz o Get da confirmação do usuario logado******/
export const fetchConfirm = async (id) => {
  const data = db.collection("Confirmacao").doc(id);
  const response = await data.get();
  return response;
};

/******Função que faz o Get da confirmação de todos usuarios******/
export const fetchAllConfirm = async (id) => {
  const data = db.collection("Confirmacao");
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

/******Função que adiciona treino da corrida******/
export const addRunningTraining = async (data, id) => {
  const response = await db
    .collection("Corrida")
    .add(data)
    .then(() => {
      return { data: doc, status: 200 };
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

/******Função que edita data do treino******/
export const changeTrainingData = async (data, id) => {
  const response = await db
    .collection("Treinos")
    .doc(id)
    .set({ Treinos: data })
    .then(() => {
      return { status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que adiciona usuário******/
export const addUser = async (email, uid, nome, isAdmin) => {
  const response = await db
    .collection("users")
    .doc(uid)
    .set({
      email: email,
      nome: nome,
      isAdmin,
    })
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};

/******Função de confirmação de ir ao treino******/
export const confirmTraining = async (data) => {
  const response = await db
    .collection("Confirmacao")
    .doc(data.uid)
    .set({
      nome: data.nome,
      data: data.data,
      confirm: data.confirm,
    })
    .then((doc) => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });

  return response;
};
