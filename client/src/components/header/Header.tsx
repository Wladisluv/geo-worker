import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Header.module.scss";
import { IconButton } from "@mui/material";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.items}>
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleSidebarToggle}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div>
          <h2>Wladisluv</h2>
        </div>
      </div>
      <Sidebar open={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />
    </div>
  );
};

export default Header;
