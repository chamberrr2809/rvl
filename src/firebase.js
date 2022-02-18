import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyCrNBDu3UeRZT5lLKQjGehrn2-gAk3OWSA',
  authDomain: 'rvl-backend.firebaseapp.com',
  projectId: 'rvl-backend',
  storageBucket: 'rvl-backend.appspot.com',
  messagingSenderId: '1015482285243',
  appId: '1:1015482285243:web:b8d27cb88c1456e426fd9e',
  measurementId: 'G-9WD9YLMVBY',
});

const db = getFirestore(app);
const auth = getAuth(app);
export default db;
export { auth };
