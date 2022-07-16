import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth, db } from './useAuth';

function useMeeting() {
    const [meetings, setMeetings] = useState([])
    const [notifications, setNotifications] = useState([])
    const {user} = useAuth();
    const notificationRef = doc(db, "notifications", user.email)

    useEffect(() => {
        const unsubscribe = onSnapshot(notificationRef, snapshot => {
            setNotifications(snapshot.data().new)
        })

        return () => {
            unsubscribe();
            notifications.map(notification => (
                onSnapshot(doc(db, "meetings", notification.docID), snapshot => {
                    setMeetings(snapshot.data())
                })
            ))
        }
    }, [user.uid])

  return {
    meetings, setMeetings
  }
}

export default useMeeting