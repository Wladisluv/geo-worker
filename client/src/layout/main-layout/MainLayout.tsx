import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import styles from "./MainLayout.module.scss";
import { Box } from "@mui/material";

const MainLayout = () => {
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
          <div className={styles.inner}></div>
        </Box>
      </div>
    </div>
  );
};

export default MainLayout;
