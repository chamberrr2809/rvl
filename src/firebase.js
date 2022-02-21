import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
  apiKey: "AIzaSyCInJPJ1_yPxbpwNubd55LA0XRa41ltFGc",
  authDomain: "rvl-project-7c1f2.firebaseapp.com",
  projectId: "rvl-project-7c1f2",
  storageBucket: "rvl-project-7c1f2.appspot.com",
  messagingSenderId: "473593978945",
  appId: "1:473593978945:web:402d52a79516d69a5ca6c0",
  measurementId: "G-7WQX6PQFLW"
});

const db = getFirestore(app);
const auth = getAuth(app);
export default db;
export { auth };
