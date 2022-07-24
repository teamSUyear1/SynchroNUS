import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth, db } from "./useAuth";

function useTimer() {
  const [timeSpentState, setTimeSpentState] = useState(0);
  const [breakSpentState, setBreakSpentState] = useState(0);
  const { user } = useAuth();
  const timerRef = doc(db, "timer", user?.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(timerRef, (snapshot) => {
      setTimeSpentState(snapshot.data().timeSpent);
      setBreakSpentState(snapshot.data().breakTime);
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  return {
    breakSpentState,
    setBreakSpentState,
    timeSpentState,
    setTimeSpentState,
  };
}

export default useTimer;
