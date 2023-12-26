import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import PublicIcon from "@mui/icons-material/Public";

import styles from "./Sidebar.module.scss";

const PermanentDrawer = () => {
  const icons = [AccountCircleIcon, WorkIcon, PublicIcon];
  return (
    <Box className={styles.sidebar}>
      <Drawer variant="permanent" classes={{ paper: styles.sidebar }}>
        <div className={styles.title}>
          <h1>Geo-worker</h1>
        </div>
        <Divider sx={{ bgcolor: "#8D8D8D" }} />
        <List className={styles.list}>
          {["Employees", "Positions", "Map"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link to={text.toLowerCase()} style={{ width: "100%" }}>
                <ListItemButton>
                  <ListItemIcon style={{ color: "#fff" }}>
                    {React.createElement(icons[index])}
                  </ListItemIcon>
                  <ListItemText primary={text} className={styles.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default PermanentDrawer;
