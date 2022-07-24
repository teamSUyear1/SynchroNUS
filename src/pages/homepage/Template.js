import classes from "./Template.module.css";
import ImageCard from "./ImageCard";
import useWindowPosition from "../../hooks/useWindowPosition";

const Template = () => {
    const checked = useWindowPosition('introduction-page');
    return (
        <div className={classes.main}>
            <h1>WIP</h1>
            <div>
            <ImageCard checked={checked} title="Test" alt="SynchroNUS" image="" height={200} width={200}>Test</ImageCard>
            </div>
        </div>
    )
}

export default Template;
