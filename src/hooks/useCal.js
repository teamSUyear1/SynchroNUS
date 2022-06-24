import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useAssignment from "./useAssignment";
import useClasses from "./useClasses";
import { useAuth, db } from "./useAuth";

function useCal() {
  const [allEvent, setAllEvent] = useState([]);
  const { user } = useAuth();
  const { events } = useAssignment();
  const { timetable } = useClasses();

  function addEvent(description, assignementType, date) {
    const newEvents = {
      type: "Assignment",
      description: description,
      summary: assignementType,
      dtstart: null,
      dtend: date,
      location: null,
    };
    return newEvents;
  }

  useEffect(() => {
    function setCal(newEvents) {
      setAllEvent(newEvents);
      setDoc(doc(db, "allevents", user?.uid), { events: newEvents });
    }
    setCal(
      timetable.concat(
        events.map((task) => addEvent(task.title, task.type, task.date))
      )
    );
  }, [user.uid, timetable, events]);

  return {
    allEvent,
    setAllEvent,
  };
}

export default useCal;
