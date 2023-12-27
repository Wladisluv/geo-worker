import { Outlet } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import { Box } from "@mui/material";

import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  // Используем как обертку над всеми страницами
  return (
    <div>
      <Sidebar />
      <Header />
      <div>
        <Box
          sx={{
            position: "fixed",
            top: "111px",
            right: "20px",
            left: "220px",
            bottom: "20px",
            overflow: "scroll",
            borderRadius: "25px",
            backgroundColor: "#fff",
          }}
        >
          <div className={styles.inner}>
            <Outlet />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default MainLayout;
