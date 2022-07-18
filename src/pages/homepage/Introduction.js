import ImageCard from "./ImageCard";
import useWindowPosition from "../../hooks/useWindowPosition";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
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

    // props to be added below
    return (
        <div className={classes.main} id="introduction-page">
            <ImageCard checked={checked}/>
            <ImageCard checked={checked}/>
        </div>
      );
}

export default Introduction;