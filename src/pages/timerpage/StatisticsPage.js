/* To be addded:
    -CSS transitions
    -data of time spent
*/
import { useAuth, db } from "../../hooks/useAuth";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import useTimer from "../../hooks/useTimer";
import { Grid, Typography } from "@mui/material";

const statisticsPage = () => {
    
    return (
        <Grid container justifyContent="center">
        <Typography>You have spent a total of ... minutes on studying! {"=)"}</Typography>
        </Grid>
    )
}

export default statisticsPage;