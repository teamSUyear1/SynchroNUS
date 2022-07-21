import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth, db } from './useAuth';

function useNotification() {
    const [notifications, setNotifications] = useState([])
    const {user} = useAuth();
    const notificationRef = doc(db, "notifications", user.email)

    useEffect(() => {
        const unsubscribe = onSnapshot(notificationRef, snapshot => {
            setNotifications(snapshot.data().new)
        })

        return () => {
            unsubscribe();
        }
    }, [user.uid])

  return {
    notifications, setNotifications
  }
}

export default useNotification