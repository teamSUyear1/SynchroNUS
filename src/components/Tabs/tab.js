import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from "react";

export default function Tabs(props) {
  const [value, setValue] = useState("1");
  const { children, label1, label2, label3, label4, label5, label6, label7, label8 } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1"}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
          <TabList onChange={handleChange} variant="scrollable">
            <Tab label={label1} value="1" />
            <Tab label={label2} value="2"  icon={<StarBorderIcon />}/>
            <Tab label={label3} value="3"  icon={<StarBorderIcon />}/>
            <Tab label={label4} value="4"  icon={<StarBorderIcon />}/>
            <Tab label={label5} value="5"  icon={<StarBorderIcon />}/>
            <Tab label={label6} value="6"  icon={<StarBorderIcon />}/>
            <Tab label={label7} value="7" icon={<DoneIcon />}/>
            <Tab label={label8} value="8" icon={<ErrorOutlineIcon />}/>
          </TabList>
        </Box>
        {children}
      </TabContext>
    </Box>
  );
}
