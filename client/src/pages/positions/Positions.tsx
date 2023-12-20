import { Divider } from "@mui/material";
import Modal from "../../layout/modal/Modal";

import styles from "./Positions.module.scss";

const Positions = () => {
  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Positions</h1>
        </div>
        <div>
          <Modal forWhat="positions" modalFunction="add" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div>POSITION</div>
          <div style={{ textAlign: "end" }}>ACTIONS</div>
        </div>
        <Divider
          sx={{
            marginTop: "10px",
            marginLeft: "-20px",
            marginRight: "-20px",
          }}
          className={styles.divider}
        />
        <div className={styles.contentItem}>
          <div className={styles.contentInner}>
            <div>Backend engineer</div>
            <div
              style={{
                textAlign: "end",
                marginTop: "-10px",
              }}
            >
              <Modal forWhat="positions" modalFunction="edit" />
            </div>
          </div>
          <Divider sx={{ marginTop: "10px" }} />
        </div>
      </div>
    </>
  );
};

export default Positions;
