// src/firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBFZTvsetyXNNP6MiP2k-cRAsZRBT2M8VQ",
    authDomain: "fir-1-9d066.firebaseapp.com",
    projectId: "fir-1-9d066",
    storageBucket: "fir-1-9d066.firebasestorage.app",
    messagingSenderId: "73046543097",
    appId: "1:73046543097:web:e73058b2cb893186b03028"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener una instancia de Firestore
const db = getFirestore(app);

export { db };