import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, useAuth } from "./useAuth";

function useUser() {
  const [alluser, setAllUserState] = useState([]);
  // const [allusers, setAllUserStates] = useState([]);
  // const alluserRef = doc(db, "users", "alluser");

  const getUserInfo = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    
    setAllUserState(querySnapshot.docs.map(value => value.data()))
  };


  useEffect(() => {
    getUserInfo()
    // const unsubscribe = onSnapshot(alluserRef, (snapshot) => {
    //   setAllUserState(snapshot.data().users);
    // });

    // return () => {
    //   unsubscribe();
    // };
  }, []);

  return {
    alluser,
    setAllUserState,
  };
}

export default useUser;
