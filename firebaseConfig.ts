import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBr-gqlBW581FEeMKgST_AsIf_WYXpo31o",
  authDomain: "neveralone-cbe65.firebaseapp.com",
  projectId: "neveralone-cbe65",
  storageBucket: "neveralone-cbe65.firebasestorage.app",
  messagingSenderId: "489856093780",
  appId: "1:489856093780:web:5b3d22c801524443c7e7c1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);