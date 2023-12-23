import { Divider, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./Employees.module.scss";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import employeesStore from "../../stores/employees-store";
import EmployeeDialog from "../../layout/employee-dialog/EmployeeDialog";

const Employees = observer(() => {
  useEffect(() => {
    employeesStore.loadEmployees();
  }, []);

  console.log(employeesStore.employees);

  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Employees</h1>
        </div>
        <div>
          <EmployeeDialog modalFunction="add" />
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
        {employeesStore.employees.map((employee) => {
          return (
            <div className={styles.contentItem} key={employee.id}>
              <div className={styles.contentInner}>
                <div>{`${employee.firstName} ${employee.lastName}`}</div>
                <div>{employee.position?.title}</div>
                <div>{employee.hireDate}</div>
                {/* <div>{`${employee.location.lat} ${employee.location.lng}`}</div> */}
                <div
                  style={{
                    textAlign: "end",
                    marginTop: "-10px",
                  }}
                >
                  <EmployeeDialog modalFunction="edit" />
                </div>
              </div>
              <Divider sx={{ marginTop: "10px" }} />
            </div>
          );
        })}
      </div>
    </>
  );
});

export default Employees;
