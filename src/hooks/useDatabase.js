import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../config/firebaseConfig";
import { getDatabase } from "firebase/database";

// Add your Firebase credentials
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);