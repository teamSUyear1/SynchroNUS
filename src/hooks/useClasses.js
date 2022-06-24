import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth, db } from "./useAuth";

function useClasses() {
  const [timetable, setTimetableState] = useState([]);
  const { user } = useAuth();
  const classRef = doc(db, "timetable", user?.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(classRef, (snapshot) => {
      setTimetableState(snapshot.data().classes);
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  return {
    timetable,
    setTimetableState,
  };
}

export default useClasses;
