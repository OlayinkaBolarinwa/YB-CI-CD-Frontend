
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyAGAY7D0tLmT4UTmbx1H-6FPxbmGCKsyTQ",
  authDomain: "fintech-cicd-dashboard.firebaseapp.com",
  projectId: "fintech-cicd-dashboard",
  storageBucket: "fintech-cicd-dashboard.firebasestorage.app",
  messagingSenderId: "720294200106",
  appId: "1:720294200106:web:006d1f012ac35231cdd453",
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app); 
export const db = getFirestore(app); 

export default app;