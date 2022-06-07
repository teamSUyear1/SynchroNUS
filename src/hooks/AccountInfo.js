import { Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth, db } from "./useAuth";

function AccountInfo() {
    const [name, setName] = useState("Not set")
    const [avatar, setAvatar] = useState("");
    const { user } = useAuth();
    const docRef = doc(db, "users", user.email);

    useEffect(() => {
        const unsubscribe = onSnapshot(docRef, snapshot => {
            setName(snapshot.data().name)
            setAvatar(snapshot.data().avatar)
        })

        return () => {
            unsubscribe();
        }
    }, [])
  return  {name,avatar};
}

export default AccountInfo;
