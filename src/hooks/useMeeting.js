import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth, db } from "./useAuth";
import useNotification from "./useNotification";

function useMeeting() {
  const { notifications } = useNotification();
  const [meetings, setMeetings] = useState([]);
  // const [meet, setMeet] = useState([]);

  const getMeetings = async () => {
    const querySnapshot = await getDocs(collection(db, "meetings"));
    setMeetings(querySnapshot.docs.map((value) => value.data()));
  };

  useEffect(() => {
    getMeetings();
    // notifications.map((notification, index) =>
    //   onSnapshot(doc(db, "meetings", notification.docID), (snapshot) => {
    //     meet[index] = snapshot.data();
    //   })
    // );
    // setMeetings(meet);
  }, [notifications]);

  return { meetings, setMeetings };
}

export default useMeeting;
