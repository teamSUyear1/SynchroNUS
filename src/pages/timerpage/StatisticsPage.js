/* To be addded:
    -CSS transitions
    -data of time spent
*/
import { useAuth, db } from "../../hooks/useAuth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { Grid, Typography } from "@mui/material";

const statisticsPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h1" color="inherit">
          You have spent a total of ... minutes on studying! {"=)"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default statisticsPage;
