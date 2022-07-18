import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";
import classes from "./Header.module.css";
import { IconButton } from "@mui/material";

const Header = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Collapse
      in={checked}
      {...(checked ? { timeout: 1000 } : {})}
      collapseHeight={50}
    >
      <div className={classes.title}>
        Synchro<span className={classes.colorText}>NUS.</span>
      </div>
      <div className={classes.goDown}>
        <IconButton>
          <ExpandMoreIcon
            sx={{
              fontSize: "4rem",
              color: "#FF5F1F",
            }}
          />
        </IconButton>
      </div>
    </Collapse>
  );
};

export default Header;
