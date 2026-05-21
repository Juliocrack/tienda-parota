import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// 1. Definimos la configuración usando las variables de entorno
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

// --- LOGS DE DEPURACIÓN ---

// Log 1: Revisa qué está leyendo dotenv directamente del sistema/archivo
console.log('dotenv env:', {
  APIKEY: process.env.REACT_APP_FIREBASE_API_KEY,
  AUTH: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  PROJ: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  STORAGE: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  MSG: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  APP: process.env.REACT_APP_FIREBASE_APP_ID
})

// Log 2: Muestra el objeto de configuración final que recibirá Firebase
console.log('firebaseConfig:', firebaseConfig)

// Log extra de confirmación rápida
console.log('Intentando conectar a Firebase para el proyecto:', firebaseConfig.projectId)

// --- INICIALIZACIÓN ---

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)