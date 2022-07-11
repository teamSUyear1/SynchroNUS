import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth, db } from "./useAuth";

function useTimer() {
  const [events, setEventsState] = useState(0);
  const { user } = useAuth();
  const timerRef = doc(db, "timer", user?.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(timerRef, (snapshot) => {
      setEventsState(snapshot.data().timeSpent);
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  return {
    events,
    setEventsState,
  };
}

export default useTimer;
