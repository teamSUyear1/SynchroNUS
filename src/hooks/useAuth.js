import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithRedirect,
} from "firebase/auth";
import React, { useState, useEffect, useContext, createContext } from "react";
import { getFirestore, doc, setDoc, getDoc } from "@firebase/firestore";
import {getStorage} from "firebase/storage"

// Add your Firebase credentials
const app = initializeApp(firebaseConfig);

// Hacky export, a cleaner way might be to export it from firebaseConfig
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(app);

export const storage = getStorage(app);

// Initialize Google Authentication and get a reference to the service
const googleAuthProvider = new GoogleAuthProvider();

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("Not set");
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const signin = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      }
    );
  };
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password).then(
      (response) => {
        setUser(response.user);
        return response.user;
      }
    );
  };
  const signout = () => {
    return firebaseAuth.signOut().then(() => {
      setUser(false);
    });
  };
  const sendPasswordResetEmail = (email) => {
    return firebaseAuth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };
  const confirmPasswordReset = (code, password) => {
    return firebaseAuth.confirmPasswordReset(code, password).then(() => {
      return true;
    });
  };
  const signInWithGoogle = () => {
    return signInWithRedirect(firebaseAuth, googleAuthProvider);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // Add information to firestore whenever is a new user
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          console.log("Add information to database");
          await setDoc(docRef, {
            name: user?.displayName,
            avatar: user?.photoURL,
            uid: user?.uid
          });
        }
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    name,
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithGoogle,
  };
}
