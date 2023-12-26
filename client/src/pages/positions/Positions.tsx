import { useEffect } from "react";

import { observer } from "mobx-react-lite";
import positionsStore from "../../stores/positions-store";

import PositionDialog from "../../layout/position-dialog/PositionDialog";
import { Divider } from "@mui/material";

import styles from "./Positions.module.scss";

const Positions = observer(() => {
  useEffect(() => {
    positionsStore.loadPositions();
  }, []);

  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Positions</h1>
        </div>
        <div>
          <PositionDialog modalFunction="add" />
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
        {positionsStore.positions.length === 0 ? (
          <h2 className={styles.stub}>No positions found 🔎</h2>
        ) : (
          positionsStore.positions.map((pos) => {
            return (
              <div className={styles.contentItem} key={pos.id}>
                <div className={styles.contentInner}>
                  <div>{pos.title}</div>
                  <div
                    style={{
                      textAlign: "end",
                      marginTop: "-10px",
                    }}
                  >
                    <PositionDialog
                      modalFunction="edit"
                      positionId={pos.id}
                      initPosTitle={pos.title}
                    />
                  </div>
                </div>
                <Divider sx={{ marginTop: "10px" }} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
});

export default Positions;
