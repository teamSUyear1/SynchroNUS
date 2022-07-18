import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";
import classes from "./Header.module.css";
import { IconButton } from "@mui/material";
import { Link as Scroll } from 'react-scroll';

const Header = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.main} id="header">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapseHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Synchro<span className={classes.colorText}>NUS.</span>
          </h1>
          <Scroll to="introduction-page" smooth={true}>
          <IconButton>
            <div className={classes.goDown}>
              <ExpandMoreIcon sx={{ fontSize: "4rem" }} />
            </div>
          </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
};

export default Header;
