import ImageCard from "./ImageCard";
import useWindowPosition from "../../hooks/useWindowPosition";
import { makeStyles } from '@material-ui/core/styles';
import Image from "../../components/Assets/bgimg.jpg";

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
            <ImageCard checked={checked}/>
            <ImageCard checked={checked}/>
        </div>
      );
}

export default Introduction;