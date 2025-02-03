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
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";




/******Função que faz o upload do vídeo******/
// export const uploadVideo = async (file) => {
//   const storage = getStorage();
//   // const storageRef = ref(storage);
//   // uploadBytes(storageRef, file).then((snapshot) => {
//   //   console.log('Uploaded a blob or file! ',snapshot);
//   // });

//   const storageRef = ref(storage, `videos/${file.name}`);
//   // const uploadTask = uploadBytesResumable(storageRef, file);

//   try {
//     // 📌 Fazendo o upload do vídeo
//     const snapshot = await uploadBytes(storageRef, file);
//     console.log("Upload concluído!");

//     // 📌 Obtendo a URL correta do arquivo enviado
//     const url = await getDownloadURL(snapshot.ref);
//     console.log("URL do vídeo:", url);

//     return url;
//   } catch (error) {
//     console.error("Erro ao fazer upload do vídeo:", error);
//   }

//   // getDownloadURL(storageRef)
//   // .then((url) => {
//   //   console.log("URL correta do vídeo:", url);
//   // })
//   // .catch((error) => {
//   //   console.error("Erro ao obter a URL do vídeo:", error);
//   // });

//   // uploadTask.on(
//   //   "state_changed",
//   //   (snapshot) => {
//   //     const percent = Math.round(
//   //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//   //     );
//   //     console.log(`Upload is ${percent}% done`);
//   //   },
//   //   (error) => console.log(error),
//   //   () => {
//   //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//   //       console.log("File available at", url);
//   //     });
//   //   }
//   // );
// };

// export const uploadVideo = (file) => {
//   const storage = getStorage();
  
//   const storageRef = ref(storage, file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on('state_changed',
//       (snapshot) => {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         // setUploadProgress(progress)          
//         switch (snapshot.state) {
//           case 'paused':
//             console.log('Upload is paused');
//             break;
//           case 'running':
//             console.log('Upload is running');
//             break;
//         }
//       },
//       (error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//           case 'storage/unauthorized':
//             // User doesn't have permission to access the object
//             break;
//           case 'storage/canceled':
//             // User canceled the upload
//             break;

//           // ...

//           case 'storage/unknown':
//             // Unknown error occurred, inspect error.serverResponse
//             break;
//         }
//       },
//       () => {
//         // Upload completed successfully, now we can get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {    
//           console.log('downloadURL ',downloadURL)        
//           // setUploadProgress()
//         });
//       } 
//     )     
// } 

export const uploadVideo = async (file) => {
  console.log("file ",file)
  const storage = getStorage();
  console.log('storage ',storage)
  const storageRef = ref(storage, `videos/${file.name}`);
  console.log('storageRef ',storageRef)

  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload concluído!");
    const url = await getDownloadURL(snapshot.ref);
    console.log("URL do vídeo:", url); 

    return url;
  } catch (error) {
    console.error("Erro ao fazer upload do vídeo:", error);
  }
};

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
export const fetchTrainings = async (training) => {
  const data = db.collection(training);
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
export const addUser = async (email, uid, nome, isAdmin, tipo) => {
  const response = await db
    .collection("users")
    .doc(uid)
    .set({
      email: email,
      nome: nome,
      tipo: tipo,
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



/****Personal ******/


/******Função que cria Bd para personal******/
export const createPersonalTraining = async (data, name) => {
  const bdPersonal = name.replace(" ", "")
  const response = await db
    .collection(bdPersonal)
    .add(data)
    .then(() => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que adiciona treino para personal******/
export const addPersonalTraining = async (data, name, id) => {
  const bdPersonal = name.replace(" ", "")
  const response = await db
    .collection(bdPersonal)
    .doc(data.id)
    .update(data)
    .then(() => {
      return { data: doc, status: 200 };
    })
    .catch((err) => {
      return { status: 400 };
    });
  return response;
};

/******Função que faz o Get dos treinos do aluno******/
export const fetchTrainingsPersonal = async (colect) => {
  const data = db.collection(colect);
  const response = await data.get();
  return response;
};