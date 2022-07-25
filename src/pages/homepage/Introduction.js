import ImageCard from "./ImageCard";
import useWindowPosition from "../../hooks/useWindowPosition";
import { makeStyles } from '@material-ui/core/styles';
import Image from "../../components/Assets/bgimg.jpg";
import studytimer from "../../components/Assets/studytimer.jpeg";
import asspage from "../../components/Assets/asspage.jpeg";
import modview from "../../components/Assets/modview.jpeg";
import meeting from "../../components/Assets/meeting.jpeg";

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
        flexDirection: 'row',
      },
    },
    margining: {
      marginTop: '10vh',
    },
  }));

const Introduction = () => {
    const classes = useStyles();
    const checked = useWindowPosition('header');

    // props to be added below, namely the description, through imports 
    return (
        <div className={classes.main} id="introduction-page">
            <div>
            <ImageCard checked={checked} title="Deadline Reminder" alt="SynchroNUS" image={asspage} height={200} width={100}>Alleviate your stress from upcoming deadlines</ImageCard>
            <ImageCard checked={checked} title="Meeting Scheduler" alt="SynchroNUS" image={meeting} height={200} width={100}>Lead project meetings timely</ImageCard>
            </div>
            <div>
            <ImageCard checked={checked} title="Study Timer" alt="SynchroNUS" image={studytimer} height={200} width={100}>Beat procrastination</ImageCard>
            <ImageCard checked={checked} title="Timetable Viewer" alt="SynchroNUS" image={modview} height={200} width={100}>Always on schedule</ImageCard>
            </div>
        </div>
      );
}

export default Introduction;