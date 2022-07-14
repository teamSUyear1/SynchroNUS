import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, useAuth } from "./useAuth";

function useUser() {
  const [alluser, setAllUserState] = useState([]);
  const alluserRef = doc(db, "users", "alluser");


  useEffect(() => {
    const unsubscribe = onSnapshot(alluserRef, (snapshot) => {
        setAllUserState(snapshot.data().users)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    alluser,
    setAllUserState,
  };
}

export default useUser;
