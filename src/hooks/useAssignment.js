import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuth, db } from './useAuth'

function UseAssignment() {
    const [events, setEventsState] = useState([])
    const {user} = useAuth();
    const assignmentRef = doc(db, "assignments", user?.uid)

    useEffect(() => {
        const unsubscribe = onSnapshot(assignmentRef, snapshot => {
            setEventsState(snapshot.data().tasks)
        })

        return () => {
            unsubscribe();
        }
    }, [user.uid])

  return {
    events,
    setEventsState,
  }
}

export default UseAssignment