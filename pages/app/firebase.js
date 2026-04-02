import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB81Z-L4VtwkPiH8AHa3NzI_y3xnzx-4Jw",
  authDomain: "social-ninja-s.firebaseapp.com",
  projectId: "social-ninja-s",
  storageBucket: "social-ninja-s.firebasestorage.app",
  messagingSenderId: "148307495726",
  appId: "1:148307495726:web:9e6e85aed99c104f3bc8bf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
