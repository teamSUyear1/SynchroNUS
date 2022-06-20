import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";

const SettingsCardUI = (props) => {
    const timeConfigHandler = () => {
        props.setSession(props.templateSession);
        props.setBreak(props.templateBreak);
    }

  return (
    <Card variant="outlined" sx={{ minWidth: 200, mr: "20px" }}>
      <CardContent>
        {/*Add session time and break time, and a button to set the timings*/}
        <Typography
          sx={{ fontWeight: "bold", fontSize: 20 }}
          color={"white"}
          gutterBottom
        >
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          &nbsp; Session Time:<br></br>
          &nbsp; {props.formatTime(props.templateSession)}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          &nbsp; Break Time: <br></br>
          &nbsp; {props.formatTime(props.templateBreak)}
        </Typography>
        <CardActions>
          <Button variant="outlined" onClick={timeConfigHandler}>
            Set
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SettingsCardUI;
