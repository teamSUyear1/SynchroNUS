import ImageCard from "./ImageCard";
import useWindowPosition from "../../hooks/useWindowPosition";
import { makeStyles } from '@material-ui/core/styles';
import Image from "../../components/Assets/bgimg.jpg";
import Timer from "../../components/Assets/timer.jpg"
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    main: {
      background: `url(${Image}) rgba(0,0,0,.6)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundBlendMode: 'multiply',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
  }));

const Introduction = () => {
    const classes = useStyles();
    const checked = useWindowPosition('header');

    // props to be added below, namely the description, through imports 
    return (
        <div className={classes.main} id="introduction-page">
        <Stack direction="row">
            <ImageCard checked={checked} title="Deadline Reminder" alt="SynchroNUS" image="" height={300} width={200}>Alleviate your stress from upcoming deadlines</ImageCard>
            <ImageCard checked={checked} title="Meeting Scheduler" alt="SynchroNUS" image="" height={300} width={200}>Lead project meetings timely</ImageCard>
            </Stack>
            <Stack direction="row">
            <ImageCard checked={checked} title="Study Timer" alt="SynchroNUS" image={Timer} height={300} width={200}>Beat procrastination</ImageCard>
            <ImageCard checked={checked} title="Timetable Viewer" alt="SynchroNUS" image="" height={300} width={200}>Always on schedule</ImageCard>
            </Stack>
        </div>
      );
}

export default Introduction;