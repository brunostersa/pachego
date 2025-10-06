import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB7a4wxAKqJ_Az7GEYBr6B74Z7_aaJDWF0",
  authDomain: "pachego-transportes.firebaseapp.com",
  projectId: "pachego-transportes",
  storageBucket: "pachego-transportes.firebasestorage.app",
  messagingSenderId: "581749801631",
  appId: "1:581749801631:web:f747d4e6935cf1bf39d8aa",
  measurementId: "G-52LNKJFP11"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar Firestore
export const db = getFirestore(app)

export default app
