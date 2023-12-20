import { Divider, InputAdornment, OutlinedInput } from "@mui/material";
import Modal from "../../layout/modal/Modal";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./Employees.module.scss";

const Employees = () => {
  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Employees</h1>
        </div>
        <div>
          <Modal forWhat="employees" modalFunction="add" />
        </div>
      </div>
      <OutlinedInput
        sx={{ width: "360px", marginTop: "20px" }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        type="search"
        placeholder="Search for employees"
      />
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div>PERSON</div>
          <div>POSITION</div>
          <div>HIRE DATE</div>
          <div>LOCATION</div>
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
            <div>Steve Jobs</div>
            <div>Backend engineer</div>
            <div>12 Nov 2021</div>
            <div>Krasnaya street, 21</div>
            <div
              style={{
                textAlign: "end",
                marginTop: "-10px",
              }}
            >
              <Modal forWhat="employees" modalFunction="edit" />
            </div>
          </div>
          <Divider sx={{ marginTop: "10px" }} />
        </div>
      </div>
    </>
  );
};

export default Employees;
